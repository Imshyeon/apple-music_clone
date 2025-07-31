import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {BlurView} from 'expo-blur'
import Ionicons from '@expo/vector-icons/Ionicons'
import {StyleSheet} from 'react-native'

const Tab = createBottomTabNavigator()

import ArtistsStackNavigation from './ArtistsStackNavigation'
import FavoritesStackNavigation from './FavoritesStackNavigation'
import PlaylistsStackNavigation from './PlayListsStackNavigation'
import SongsStackNavigation from './SongsStackNavigation'

import {colors} from '../helper/constants'

const MainBottomTabNavigator = () => {
	return (
		<Tab.Navigator
			initialRouteName='Favorites'
			screenOptions={{
				headerShown: false,
				tabBarActiveTintColor: colors.primary,
				tabBarStyle: {
					position: 'absolute',
					borderTopLeftRadius: 20,
					borderTopRightRadius: 20,
					borderTopWidth: 0,
					paddingTop: 8,
				},
				tabBarBackground: () => (
					<BlurView
						intensity={40}
						style={{
							...StyleSheet.absoluteFillObject,
							overflow: 'hidden',
							borderTopLeftRadius: 20,
							borderTopRightRadius: 20,
						}}
					/>
				),
			}}
		>
			<Tab.Screen
				name='Favorites'
				component={FavoritesStackNavigation}
				options={{
					tabBarIcon: ({color, size}) => <Ionicons name='heart' color={color} size={size} />,
				}}
			/>
			<Tab.Screen
				name='Artists'
				component={ArtistsStackNavigation}
				options={{
					tabBarIcon: ({color, size}) => <Ionicons name='person' color={color} size={size} />,
				}}
			/>
			<Tab.Screen
				name='Songs'
				component={SongsStackNavigation}
				options={{
					tabBarIcon: ({color, size}) => <Ionicons name='musical-notes' color={color} size={size} />,
				}}
			/>
			<Tab.Screen
				name='Playlists'
				component={PlaylistsStackNavigation}
				options={{
					tabBarIcon: ({color, size}) => <Ionicons name='list' color={color} size={size} />,
				}}
			/>
		</Tab.Navigator>
	)
}

export default MainBottomTabNavigator
