import {useCallback} from 'react'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import {StatusBar} from 'expo-status-bar'
import {NavigationContainer} from '@react-navigation/native'
import * as SplashScreen from 'expo-splash-screen'

SplashScreen.preventAutoHideAsync()

SplashScreen.setOptions({
	duration: 1000,
	fade: true,
})

// Track Player
import TrackPlayer from 'react-native-track-player'

// import StackNavigator from './navigations/StackNavigator'
import MainBottomTabNavigator from './navigations/MainBottomTabNavigator'
import navigationConfig from './navigations/navigationConfig'

import {useSetupTrackPlayer} from './helper/trackPlayer/useSetupTrackPlayer'
import {useLogTrackPlayer} from './helper/trackPlayer/useLogTrackPlayer'

export default function App() {
	useLogTrackPlayer()

	const handleTrackPlayerLoad = useCallback(() => {
		// TrackPlayer.registerPlaybackService(() => require('./helper/trackPlayer/services'))
		SplashScreen.hideAsync()
	}, [])

	useSetupTrackPlayer({
		onLoad: handleTrackPlayerLoad,
	})

	return (
		<SafeAreaProvider>
			<StatusBar style='light' />
			<NavigationContainer linking={navigationConfig}>
				<MainBottomTabNavigator />
			</NavigationContainer>
		</SafeAreaProvider>
	)
}
