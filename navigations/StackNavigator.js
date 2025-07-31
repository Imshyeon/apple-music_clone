import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {getFocusedRouteNameFromRoute} from '@react-navigation/native'

const Stack = createNativeStackNavigator()

import MainBottomTabNavigator from './MainBottomTabNavigator'

import SongsScreen from '../screens/SongsScreen'
import SongDetailScreen from '../screens/SongDetailScreen'
import ArtistsScreen from '../screens/ArtistsScreen'
import ArtistDetailScreen from '../screens/ArtistDetailScreen'
import FavoritesScreen from '../screens/FavoritesScreen'
import FavoriteDetailScreen from '../screens/FavoriteDetailScreen'
import PlaylistsScreen from '../screens/PlaylistsScreen'
import PlaylistDetailScreen from '../screens/PlaylistDetailScreen'

import {colors} from '../helper/constants'

const StackNavigator = () => {
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
			<Stack.Screen
				name='Home'
				component={MainBottomTabNavigator}
				options={({route}) => {
					const routeName = getFocusedRouteNameFromRoute(route) ?? 'Favorites'
					return {
						headerTitle: routeName,
					}
				}}
			/>
			{/* <Stack.Screen name='Songs' component={SongsScreen} />
			<Stack.Screen name='SongDetail' component={SongDetailScreen} />
			<Stack.Screen name='Artists' component={ArtistsScreen} />
			<Stack.Screen name='ArtistDetail' component={ArtistDetailScreen} />
			<Stack.Screen name='Favorites' component={FavoritesScreen} />
			<Stack.Screen name='FavoriteDetail' component={FavoriteDetailScreen} />
			<Stack.Screen name='Playlists' component={PlaylistsScreen} />
			<Stack.Screen name='PlaylistDetail' component={PlaylistDetailScreen} /> */}
		</Stack.Navigator>
	)
}

export default StackNavigator
