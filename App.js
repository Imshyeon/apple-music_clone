import {View} from 'react-native'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import {StatusBar} from 'expo-status-bar'
import {NavigationContainer} from '@react-navigation/native'

import MainStackNavigator from './navigations/MainStackNavigator'
import navigationConfig from './navigations/navigationConfig'

export default function App() {
	return (
		<SafeAreaProvider>
			<StatusBar style='auto' />
			<NavigationContainer linking={navigationConfig} r>
				<MainStackNavigator />
			</NavigationContainer>
		</SafeAreaProvider>
	)
}
