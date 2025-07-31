import {createNativeStackNavigator} from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator()

import {colors} from '../helper/constants'

import ArtistsScreen from '../screens/ArtistsScreen'
import ArtistDetailScreen from '../screens/ArtistDetailScreen'

const ArtistsStackNavigation = () => {
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
			<Stack.Screen name='ArtistsScreen' options={{title: 'Artists'}} component={ArtistsScreen} />
			<Stack.Screen name='ArtistDetail' component={ArtistDetailScreen} />
		</Stack.Navigator>
	)
}

export default ArtistsStackNavigation
