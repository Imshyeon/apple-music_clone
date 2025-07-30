// https://velog.io/@ttoottie/RN-%EC%8A%A4%ED%81%AC%EB%A1%A4%EC%97%90-%EB%94%B0%EB%9D%BC-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8%EB%A5%BC-%EB%8F%99%EC%A0%81%EC%9C%BC%EB%A1%9C-%EB%B3%80%ED%99%94%EC%8B%9C%EC%BC%9C%EB%B3%B4%EC%9E%90
import {useLayoutEffect, useRef} from 'react'
import {Animated, StyleSheet} from 'react-native'
import {BlurView} from 'expo-blur'

import {colors} from '../helper/constants'
import {defaultStyles} from '../helper/styles'
import TrackList from '../components/TrackList'

const SongsScreen = ({navigation}) => {
	const scrollY = useRef(new Animated.Value(0)).current

	const handlerScroll = (e) => {
		const position = e.nativeEvent.contentOffset.y
		// console.log('SongsScreen - position', position)
		scrollY.setValue(position)
	}

	const headerHeight = scrollY.interpolate({
		inputRange: [0, 100],
		outputRange: [200, 97.7],
		extrapolate: 'clamp',
	})

	useLayoutEffect(() => {
		navigation.setOptions({
			headerBackground: () => <Animated.View style={{...StyleSheet.absoluteFillObject, backgroundColor: colors.background, height: headerHeight}}></Animated.View>,
		})
	}, [headerHeight])

	return (
		<Animated.ScrollView scrollEventThrottle={10} onScroll={handlerScroll} style={[defaultStyles.container, {flex: 1, position: 'relative', paddingTop: 100}]}>
			<TrackList />
		</Animated.ScrollView>
	)
}

export default SongsScreen
