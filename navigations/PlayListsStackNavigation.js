import {createNativeStackNavigator} from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator()

import {colors} from '../helper/constants'

import PlaylistsScreen from '../screens/PlaylistsScreen'
import PlaylistDetailScreen from '../screens/PlaylistDetailScreen'

const PlaylistsStackNavigation = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerLargeTitle: true,
				headerStyle: {
					backgroundColor: colors.background,
				},
				headerTintColor: colors.text,
				headerBlurEffect: 'systemUltraThinMaterial',
				contentStyle: {
					backgroundColor: colors.background,
					paddingHorizontal: 16,
				},
			}}
		>
			<Stack.Screen name='PlaylistsScreen' options={{title: 'Playlists'}} component={PlaylistsScreen} />
			<Stack.Screen name='PlaylistDetail' component={PlaylistDetailScreen} />
		</Stack.Navigator>
	)
}

export default PlaylistsStackNavigation
