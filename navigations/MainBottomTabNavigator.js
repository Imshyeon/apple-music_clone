import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {BlurView} from 'expo-blur'
import Ionicons from '@expo/vector-icons/Ionicons'

const Tab = createBottomTabNavigator()

import ArtistsScreen from '../screens/ArtistsScreen'
import FavoritesScreen from '../screens/FavoritesScreen'
import PlaylistsScreen from '../screens/PlaylistsScreen'
import SongsScreen from '../screens/SongsScreen'

import {colors} from '../helper/constants'

const MainBottomTabNavigator = () => {
	return (
		<Tab.Navigator
			initialRoute='Favorites'
			screenOptions={{
				headerTintColor: colors.text,
				headerTitleAlign: 'left',
				headerTitleStyle: {
					fontSize: 20,
					fontWeight: 'bold',
				},
				headerStyle: {backgroundColor: colors.background},
				tabBarStyle: {position: 'absolute', paddingTop: 5},
				tabBarBackground: () => <BlurView intensity={100} tint='light' style={{flex: 1, backgroundColor: colors.background, opacity: 0.9}} />,
			}}
		>
			<Tab.Screen
				name='Favorites'
				component={FavoritesScreen}
				options={{
					tabBarIcon: ({color, size}) => <Ionicons name='heart' color={color} size={size} />,
				}}
			/>
			<Tab.Screen
				name='Artists'
				component={ArtistsScreen}
				options={{
					tabBarIcon: ({color, size}) => <Ionicons name='person' color={color} size={size} />,
				}}
			/>
			<Tab.Screen
				name='Songs'
				component={SongsScreen}
				options={{
					tabBarIcon: ({color, size}) => <Ionicons name='musical-notes' color={color} size={size} />,
				}}
			/>
			<Tab.Screen
				name='Playlists'
				component={PlaylistsScreen}
				options={{
					tabBarIcon: ({color, size}) => <Ionicons name='list' color={color} size={size} />,
				}}
			/>
		</Tab.Navigator>
	)
}

export default MainBottomTabNavigator
