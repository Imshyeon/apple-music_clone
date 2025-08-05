import {SafeAreaProvider} from 'react-native-safe-area-context'
import {StatusBar} from 'expo-status-bar'
import {NavigationContainer} from '@react-navigation/native'

// import StackNavigator from './navigations/StackNavigator'
import MainBottomTabNavigator from './navigations/MainBottomTabNavigator'
import navigationConfig from './navigations/navigationConfig'
import MusicPlayer from './components/MusicPlayer'

export default function App() {
	return (
		<SafeAreaProvider>
			<StatusBar style='light' />
			<NavigationContainer linking={navigationConfig}>
				<MainBottomTabNavigator />
				<MusicPlayer />
			</NavigationContainer>
		</SafeAreaProvider>
	)
}
