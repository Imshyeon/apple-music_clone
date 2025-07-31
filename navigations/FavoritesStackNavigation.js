import {createNativeStackNavigator} from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator()

import {colors} from '../helper/constants'

import FavoritesScreen from '../screens/FavoritesScreen'
import FavoriteDetailScreen from '../screens/FavoriteDetailScreen'

const FavoritesStackNavigation = () => {
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
			<Stack.Screen name='FavoritesScreen' options={{title: 'Favorites'}} component={FavoritesScreen} />
			<Stack.Screen name='FavoriteDetail' component={FavoriteDetailScreen} />
		</Stack.Navigator>
	)
}

export default FavoritesStackNavigation
