import {useState, useEffect, useCallback} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Dimensions, Image} from 'react-native'
import TrackPlayer, {State, Event, usePlaybackState, useProgress, useTrackPlayerEvents} from 'react-native-track-player'
import * as SplashScreen from 'expo-splash-screen'
import Ionicons from '@expo/vector-icons/Ionicons'

import {useSetupTrackPlayer} from '../helper/trackPlayer/useSetupTrackPlayer'
import {useLogTrackPlayer} from '../helper/trackPlayer/useLogTrackPlayer'

import {defaultArtwork} from '../helper/constants'
import tracks from '../assets/dummy-data.json'

SplashScreen.preventAutoHideAsync()

SplashScreen.setOptions({
	duration: 1000,
	fade: true,
})

const MusicPlayer = () => {
	const [trackIndex, setTrackIndex] = useState(0)
	const [activeTrack, setActiveTrack] = useState(null)

	const playerState = usePlaybackState()
	const {position, duration} = useProgress()

	console.log(`남은 재생시간: ${duration - position}. trackIndex: ${trackIndex}, activeTrack: ${activeTrack?.title}`)
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
			setActiveTrack(trackObject)
			setTrackIndex(trackIndex)
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
			setActiveTrack(track)
			setTrackIndex(trackIndex)
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
		console.log('MusicPlayer-handleNextTrack-trackIndex', trackIndex, 'tracks.length', tracks.length)
		if (trackIndex < tracks.length - 1) {
			await TrackPlayer.skipToNext()
			const nextTrack = await TrackPlayer.getTrack(trackIndex + 1)
			console.log('MusicPlayer-handleNextTrack-nextTrack', nextTrack)
			setTrackIndex(trackIndex + 1)
			setActiveTrack(nextTrack)
		}
	}

	// 미니 플레이어 UI
	return (
		<TouchableOpacity style={styles.miniPlayerContainer}>
			<View style={styles.header}>
				<Image source={activeTrack?.artwork ? {uri: activeTrack?.artwork} : defaultArtwork} style={styles.image} />
				<Text style={styles.title}>{activeTrack?.title || '음악을 선택하세요'}</Text>
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

const {width} = Dimensions.get('window')

const styles = StyleSheet.create({
	miniPlayerContainer: {
		position: 'absolute',
		bottom: 83,
		left: 10,
		right: 10,
		height: 60,
		backgroundColor: 'rgba(0,0,0,0.9)',
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
