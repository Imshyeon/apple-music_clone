// 처음에는 headerShown:false. -> 스크롤을 내리면 그때 headerShown:true

import {useEffect, useState} from 'react'
import {BlurView} from 'expo-blur'

import {colors} from './constants'

export const useDisplayHeader = (scrollViewRef) => {
	const [displayHeader, setDisplayHeader] = useState(false)

	console.log('useDisplayHeader - displayHeader', displayHeader)

	useEffect(() => {
		const handleScroll = () => {
			setDisplayHeader(true)
		}

		scrollViewRef.current.onScrollBeginDrag = handleScroll

		return () => {
			scrollViewRef.current.onScrollBeginDrag = null
		}
	}, [])

	return {headerShown: displayHeader, headerTintColor: colors.text, headerBackground: () => <BlurView intensity={100} tint='light' style={{flex: 1, backgroundColor: colors.background, opacity: 0.9}} />}
}
