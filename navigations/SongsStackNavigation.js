import {createNativeStackNavigator} from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator()

import {colors} from '../helper/constants'

import SongsScreen from '../screens/SongsScreen'
import SongDetailScreen from '../screens/SongDetailScreen'

const SongsStackNavigation = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerLargeTitle: true,
				headerStyle: {
					backgroundColor: colors.background,
				},
				headerTintColor: colors.text,
				contentStyle: {
					backgroundColor: colors.background,
					paddingHorizontal: 16,
				},
			}}
		>
			<Stack.Screen name='SongsScreen' options={{title: 'Songs'}} component={SongsScreen} />
			<Stack.Screen name='SongDetail' options={{headerShown: false, animation: 'slide_from_bottom', presentation: 'modal'}} component={SongDetailScreen} />
		</Stack.Navigator>
	)
}

export default SongsStackNavigation
