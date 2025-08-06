import {useEffect} from 'react'
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import Ionicons from '@expo/vector-icons/Ionicons'
import TrackPlayer, {State, usePlaybackState, useProgress} from 'react-native-track-player'

import {colors} from '../helper/constants'

import {defaultArtwork} from '../helper/constants'
import {formatTime} from '../helper/musicFunctions'

import {useMusicState, useMusicDispatch} from '../context/musicAppState'

import tracks from '../assets/dummy-data.json'

const SongDetailScreen = ({route}) => {
	// const {url} = route.params
	const state = useMusicState()
	const dispatch = useMusicDispatch()

	const playerState = usePlaybackState()
	const {position, duration} = useProgress()

	const track = state.activeTrack ? tracks.find((track) => track.url === state.activeTrack.url) : null

	// 재생 버튼 클릭 시, 재생 상태 변경
	const togglePlayback = async (playerState) => {
		const currentTrack = await TrackPlayer.getActiveTrack()
		if (currentTrack !== null) {
			if (playerState.state === State.Paused || playerState.state === State.Ready) {
				console.log('MusicPlayer-togglePlayback-play')
				await TrackPlayer.play()
				dispatch({type: 'SET_PLAYER_STATE', payload: {state: State.Playing}})
				dispatch({type: 'SET_POSITION', payload: position})
				dispatch({type: 'SET_DURATION', payload: duration})
			} else {
				console.log('MusicPlayer-togglePlayback-pause')
				await TrackPlayer.pause()
				dispatch({type: 'SET_PLAYER_STATE', payload: {state: State.Paused}})
				dispatch({type: 'SET_POSITION', payload: position})
				dispatch({type: 'SET_DURATION', payload: duration})
			}
		}
	}

	// 이전 트랙 재생
	const handlePreviousTrack = async () => {
		// console.log('MusicPlayer-handlePreviousTrack-trackIndex', state.activeTrackIndex, 'tracks.length', tracks.length)
		if (state.activeTrackIndex > 0) {
			const previousTrackIndex = state.activeTrackIndex - 1
			const previousTrack = await TrackPlayer.getTrack(previousTrackIndex)
			dispatch({type: 'SET_ACTIVE_TRACK', payload: previousTrack})
			dispatch({type: 'SET_ACTIVE_TRACK_INDEX', payload: previousTrackIndex})
			dispatch({type: 'SET_PLAYER_STATE', payload: state.playerState})
			dispatch({type: 'SET_POSITION', payload: 0})
			dispatch({type: 'SET_DURATION', payload: duration})
		} else {
			dispatch({type: 'SET_ACTIVE_TRACK', payload: tracks[tracks.length - 1]})
			dispatch({type: 'SET_ACTIVE_TRACK_INDEX', payload: tracks.length - 1})
			dispatch({type: 'SET_PLAYER_STATE', payload: state.playerState})
			dispatch({type: 'SET_POSITION', payload: 0})
			dispatch({type: 'SET_DURATION', payload: duration})
		}
	}

	// 다음 트랙 재생
	const handleNextTrack = async () => {
		// console.log('MusicPlayer-handleNextTrack-trackIndex', state.activeTrackIndex, 'tracks.length', tracks.length)
		if (state.activeTrackIndex < tracks.length - 1) {
			const nextTrackIndex = state.activeTrackIndex + 1
			const nextTrack = await TrackPlayer.getTrack(nextTrackIndex)
			dispatch({type: 'SET_ACTIVE_TRACK', payload: nextTrack})
			dispatch({type: 'SET_ACTIVE_TRACK_INDEX', payload: nextTrackIndex})
			dispatch({type: 'SET_PLAYER_STATE', payload: state.playerState})
			dispatch({type: 'SET_POSITION', payload: 0})
			dispatch({type: 'SET_DURATION', payload: duration})
		} else {
			dispatch({type: 'SET_ACTIVE_TRACK', payload: tracks[0]})
			dispatch({type: 'SET_ACTIVE_TRACK_INDEX', payload: 0})
			dispatch({type: 'SET_PLAYER_STATE', payload: state.playerState})
			dispatch({type: 'SET_POSITION', payload: 0})
			dispatch({type: 'SET_DURATION', payload: duration})
		}
	}

	// 플레이어 상태 변경 시, 상태 업데이트 및 트랙 정보 업데이트
	useEffect(() => {
		dispatch({type: 'SET_PLAYER_STATE', payload: playerState})
		dispatch({type: 'SET_POSITION', payload: position})
		dispatch({type: 'SET_DURATION', payload: duration})
	}, [playerState, position, duration])

	if (!track) {
		return <View style={styles.container} />
	}

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.bar} />
			{/* 트랙 이미지 */}
			<Image source={track.artwork ? {uri: track.artwork} : defaultArtwork} style={styles.image} />

			{/* 트랙 정보 */}
			<View style={styles.songInfoContainer}>
				<View style={styles.songInfo}>
					<Text style={styles.songTitle}>{track.title}</Text>
					<Text style={styles.songArtist}>{track.artist}</Text>
				</View>
				<View style={styles.songActions}>
					<TouchableOpacity style={styles.songAction}>
						<Ionicons name='star' size={16} color={colors.text} />
					</TouchableOpacity>
					<TouchableOpacity style={styles.songAction}>
						<Ionicons name='ellipsis-horizontal' size={16} color={colors.text} />
					</TouchableOpacity>
				</View>
			</View>
			{/*  트랙 재생 시간 */}
			<View style={styles.songProgressContainer}>
				<View style={styles.songProgress} />
				<View style={styles.songTimeContainer}>
					<Text style={styles.songTime}>{formatTime(state.position)}</Text>
					<Text style={styles.songTime}>{formatTime(state.duration)}</Text>
				</View>
			</View>
			{/* 트랙 재생 버튼 */}
			<View style={styles.songPlayContainer}>
				<TouchableOpacity onPress={handlePreviousTrack}>
					<Ionicons name='play-back' size={44} color={colors.text} />
				</TouchableOpacity>
				<TouchableOpacity onPress={() => togglePlayback(state.playerState)}>
					<Ionicons name={playerState.state === State.Playing ? 'pause' : 'play'} size={52} color={colors.text} />
				</TouchableOpacity>
				<TouchableOpacity onPress={handleNextTrack}>
					<Ionicons name='play-forward' size={44} color={colors.text} />
				</TouchableOpacity>
			</View>
			{/*  트랙 소래 조절 */}
			<View style={styles.songSliderContainer}>
				<Ionicons name='volume-low' size={20} color={colors.text} />
				<View style={styles.songSlider} />
				<Ionicons name='volume-high' size={20} color={colors.text} />
			</View>
			{/* 트랙 관련 버튼 */}
			<View style={styles.songRelatedContainer}>
				<TouchableOpacity>
					<Ionicons name='chatbox-ellipses' size={20} color={colors.text} />
				</TouchableOpacity>
				<TouchableOpacity>
					<Ionicons name='headset' size={20} color={colors.text} />
				</TouchableOpacity>
				<TouchableOpacity>
					<Ionicons name='list' size={20} color={colors.text} />
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	)
}

export default SongDetailScreen

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		gap: 20,
		backgroundColor: colors.background,
		paddingHorizontal: 20,
		paddingVertical: 28,
	},
	bar: {
		width: 40,
		height: 4,
		backgroundColor: colors.textMuted,
		borderRadius: 2,
	},
	image: {
		width: '100%',
		height: 300,
		borderRadius: 16,
	},
	songInfoContainer: {
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	songInfo: {
		flexDirection: 'column',
		alignItems: 'flex-start',
		gap: 4,
	},
	songTitle: {
		fontSize: 24,
		fontWeight: 'bold',
		color: colors.text,
	},
	songArtist: {
		fontSize: 16,
		color: colors.textMuted,
	},
	songActions: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	songAction: {
		padding: 6,
		borderRadius: 50,
		backgroundColor: 'rgba(255, 255, 255, 0.2)',
	},
	songPlayContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
		width: '100%',
		paddingHorizontal: 20,
	},
	songProgressContainer: {
		width: '100%',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 16,
		paddingVertical: 16,
	},
	songProgress: {
		width: '100%',
		height: 4,
		backgroundColor: 'rgba(255, 255, 255, 0.2)',
		borderRadius: 2,
	},
	songTimeContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		width: '100%',
	},
	songTime: {
		fontSize: 12,
		color: colors.textMuted,
	},
	songSliderContainer: {
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		gap: 16,
		paddingVertical: 16,
		marginTop: 24,
	},
	songSlider: {
		flex: 1,
		width: '100%',
		height: 4,
		backgroundColor: 'rgba(255, 255, 255, 0.2)',
		borderRadius: 2,
	},
	songRelatedContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
		width: '100%',
		paddingHorizontal: 20,
	},
})
