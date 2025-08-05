// https://velog.io/@blacksooooo/React-native-react-native-track-player%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%B4-%EC%9D%8C%EC%9B%90-%ED%94%8C%EB%A0%88%EC%9D%B4%EC%96%B4-%EB%A7%8C%EB%93%A4%EA%B8%B0
// https://kevins-world.tistory.com/entry/react-native-track-player-%EC%84%B8%ED%8C%85%ED%95%98%EA%B8%B0-1

// 아래 대로 한번 해보기..
// https://medium.com/@gionata.brunel/implementing-react-native-track-player-with-expo-including-lock-screen-part-1-ios-9552fea5178c

import {useEffect, useRef, useState} from 'react'
import TrackPlayer, {Capability, RepeatMode} from 'react-native-track-player'

import trackData from '../../assets/dummy-data.json'

const setupPlayer = async () => {
	try {
		await TrackPlayer.setupPlayer({
			maxCacheSize: 1024 * 10,
		})
		await TrackPlayer.setVolume(0.03)
		await TrackPlayer.updateOptions({
			capabilities: [Capability.Play, Capability.Pause, Capability.SkipToNext, Capability.SkipToPrevious, Capability.SeekTo, Capability.Stop],
			compactCapabilities: [Capability.Play, Capability.Pause],
		})
	} catch (e) {
		console.log('Error setting up player', e)
	}
}

export const addTracks = async () => {
	await TrackPlayer.add(trackData)
	await TrackPlayer.setRepeatMode(RepeatMode.Queue)
}

// export const getPlayerInfo = async () => {
// 	const state = (await TrackPlayer.getPlaybackState()).state
// 	if (state === State.Playing) {
// 		console.log('The Player is playing')
// 	}

// 	let trackIndex = await TrackPlayer.getActiveTrackIndex()
// 	let trackObject = await TrackPlayer.getTrack(trackIndex)
// 	console.log('The active track is:', trackObject)

// 	const position = await TrackPlayer.getProgress().then((progress) => progress.position)
// 	const duration = await TrackPlayer.getDuration().then((duration) => duration)
// 	console.log(`${duration - position} seconds left.`)
// }

export const useSetupTrackPlayer = ({onLoad, onTrackInfo}) => {
	const isInitialized = useRef(false)
	const [tracks, setTracks] = useState(trackData)

	useEffect(() => {
		handleSetup()
	}, [onLoad])

	const handleSetup = async () => {
		try {
			await setupPlayer()
			isInitialized.current = true
			onLoad?.()
			await addTracks()
			onTrackInfo?.()
		} catch (e) {
			isInitialized.current = false
			console.error(e)
		}
	}

	return tracks
}
