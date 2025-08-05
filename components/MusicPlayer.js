import {useState, useCallback} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native'
import TrackPlayer, {State, Event, usePlaybackState, useProgress, useTrackPlayerEvents} from 'react-native-track-player'
import * as SplashScreen from 'expo-splash-screen'
import Ionicons from '@expo/vector-icons/Ionicons'

import {useSetupTrackPlayer} from '../helper/trackPlayer/useSetupTrackPlayer'
import {useLogTrackPlayer} from '../helper/trackPlayer/useLogTrackPlayer'
import {defaultArtwork} from '../helper/constants'
import {useMusicState, useMusicDispatch} from '../context/musicAppState'

import tracks from '../assets/dummy-data.json'

SplashScreen.preventAutoHideAsync()

SplashScreen.setOptions({
	duration: 1000,
	fade: true,
})

const MusicPlayer = ({isMiniPlayer = true}) => {
	const state = useMusicState()
	const dispatch = useMusicDispatch()

	const playerState = usePlaybackState()
	const {position, duration} = useProgress()

	console.log(`남은 재생시간: ${duration - position}. trackIndex: ${state.activeTrackIndex}, activeTrack: ${state.activeTrack?.title}`)
	// useEffect(() => {
	// 	if (duration - position === 0) {
	// 		handleNextTrack()
	// 	}
	// }, [position, duration])

	// Track Player Log 설정
	useLogTrackPlayer()

	// Track Player 세팅 1 - SplashScreen 숨기기
	const handleTrackPlayerLoad = useCallback(() => {
		SplashScreen.hideAsync()
	}, [])

	// Track Player 세팅 2 - 현재 재생 중인 트랙 정보 가져오기
	const handleTrackInfo = useCallback(async () => {
		let trackIndex = await TrackPlayer.getActiveTrackIndex()
		if (trackIndex !== null && trackIndex >= 0) {
			let trackObject = await TrackPlayer.getTrack(trackIndex)
			dispatch({type: 'SET_ACTIVE_TRACK', payload: trackObject})
			dispatch({type: 'SET_ACTIVE_TRACK_INDEX', payload: trackIndex})
		}
	}, [])

	// Track Player 세팅 3 - 트랙 기본 세팅
	useSetupTrackPlayer({
		onLoad: handleTrackPlayerLoad,
		onTrackInfo: handleTrackInfo,
	})

	useTrackPlayerEvents([Event.PlaybackActiveTrackChanged], async (event) => {
		console.log('MusicPlayer-useTrackPlayerEvents-event', event)
		// event의 구조를 살펴보니, event.nextTrack은 없고 lastTrack과 track이 있음
		if (event.type === Event.PlaybackActiveTrackChanged && event.track != null) {
			const track = await TrackPlayer.getTrack(event.track)
			dispatch({type: 'SET_ACTIVE_TRACK', payload: track})
			dispatch({type: 'SET_ACTIVE_TRACK_INDEX', payload: event.track})
		}
	})

	const togglePlayback = async (playerState) => {
		const currentTrack = await TrackPlayer.getActiveTrack()
		if (currentTrack !== null) {
			if (playerState.state === State.Paused || playerState.state === State.Ready) {
				console.log('MusicPlayer-togglePlayback-play')
				await TrackPlayer.play()
			} else {
				console.log('MusicPlayer-togglePlayback-pause')
				await TrackPlayer.pause()
			}
		}
	}

	const handleNextTrack = async () => {
		console.log('MusicPlayer-handleNextTrack-trackIndex', state.activeTrackIndex, 'tracks.length', tracks.length)
		if (state.activeTrackIndex < tracks.length - 1) {
			const nextTrackIndex = state.activeTrackIndex + 1
			const nextTrack = await TrackPlayer.getTrack(nextTrackIndex)
			dispatch({type: 'SET_ACTIVE_TRACK', payload: nextTrack})
			dispatch({type: 'SET_ACTIVE_TRACK_INDEX', payload: nextTrackIndex})
			// await TrackPlayer.skipToNext()
		}
	}

	if (!isMiniPlayer) {
		return (
			<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
				<Text>MusicPlayer</Text>
			</View>
		)
	}

	// 미니 플레이어 UI
	return (
		<TouchableOpacity style={styles.miniPlayerContainer}>
			<View style={styles.header}>
				<Image source={state.activeTrack?.artwork ? {uri: state.activeTrack?.artwork} : defaultArtwork} style={styles.image} />
				<Text style={styles.title}>{state.activeTrack?.title || '음악을 선택하세요'}</Text>
			</View>
			<View style={styles.controls}>
				{playerState.state === State.Playing ? (
					<TouchableOpacity onPress={() => togglePlayback(playerState)}>
						<Ionicons name='pause' size={24} color='white' />
					</TouchableOpacity>
				) : (
					<TouchableOpacity onPress={() => togglePlayback(playerState)}>
						<Ionicons name='play' size={24} color='white' />
					</TouchableOpacity>
				)}
				<TouchableOpacity onPress={handleNextTrack}>
					<Ionicons name='play-forward' size={24} color='white' />
				</TouchableOpacity>
			</View>
		</TouchableOpacity>
	)
}

export default MusicPlayer

const styles = StyleSheet.create({
	miniPlayerContainer: {
		position: 'absolute',
		bottom: 83,
		left: 10,
		right: 10,
		height: 60,
		backgroundColor: 'rgba(0,0,0,0.95)',
		borderRadius: 10,
		padding: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
	},
	image: {
		width: 40,
		height: 40,
		borderRadius: 10,
	},
	title: {
		fontSize: 16,
		fontWeight: 'bold',
		color: 'white',
	},
	controls: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
	},
})
