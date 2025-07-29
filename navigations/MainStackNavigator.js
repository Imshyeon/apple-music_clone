import {createStackNavigator} from '@react-navigation/stack'

const Stack = createStackNavigator()

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

const MainStackNavigator = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
				contentStyle: {
					backgroundColor: colors.background,
				},
			}}
		>
			<Stack.Screen name='Home' component={MainBottomTabNavigator} />
			<Stack.Screen name='Songs' component={SongsScreen} />
			<Stack.Screen name='SongDetail' component={SongDetailScreen} />
			<Stack.Screen name='Artists' component={ArtistsScreen} />
			<Stack.Screen name='ArtistDetail' component={ArtistDetailScreen} />
			<Stack.Screen name='Favorites' component={FavoritesScreen} />
			<Stack.Screen name='FavoriteDetail' component={FavoriteDetailScreen} />
			<Stack.Screen name='Playlists' component={PlaylistsScreen} />
			<Stack.Screen name='PlaylistDetail' component={PlaylistDetailScreen} />
		</Stack.Navigator>
	)
}

export default MainStackNavigator
