// https://velog.io/@blacksooooo/React-native-react-native-track-player%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%B4-%EC%9D%8C%EC%9B%90-%ED%94%8C%EB%A0%88%EC%9D%B4%EC%96%B4-%EB%A7%8C%EB%93%A4%EA%B8%B0
// https://kevins-world.tistory.com/entry/react-native-track-player-%EC%84%B8%ED%8C%85%ED%95%98%EA%B8%B0-1

// 아래 대로 한번 해보기..
// https://medium.com/@gionata.brunel/implementing-react-native-track-player-with-expo-including-lock-screen-part-1-ios-9552fea5178c

import {useEffect, useRef, useState} from 'react'
import TrackPlayer, {Event, useTrackPlayerEvents} from 'react-native-track-player'

const setupPlayer = async () => {
	await TrackPlayer.setupPlayer({
		maxCacheSize: 1024 * 10,
	})

	await TrackPlayer.setVolume(0.03)
}

export const useSetupTrackPlayer = ({onLoad}) => {
	const isInitialized = useRef(false)

	useEffect(() => {
		setupPlayer()
			.then(() => {
				isInitialized.current = true
				onLoad?.()
			})
			.catch((e) => {
				isInitialized.current = false
				console.error(e)
			})
	}, [onLoad])
}
