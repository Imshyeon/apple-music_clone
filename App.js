import {View} from 'react-native'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import {StatusBar} from 'expo-status-bar'
import {NavigationContainer} from '@react-navigation/native'

import StackNavigator from './navigations/StackNavigator'
import navigationConfig from './navigations/navigationConfig'

export default function App() {
	return (
		<SafeAreaProvider>
			<StatusBar style='auto' />
			<NavigationContainer linking={navigationConfig} r>
				<StackNavigator />
			</NavigationContainer>
		</SafeAreaProvider>
	)
}
