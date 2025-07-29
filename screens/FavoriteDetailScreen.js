import {View, Text} from 'react-native'

const FavoriteDetailScreen = ({route}) => {
	const {favidx} = route.params

	console.log('FavoriteDetailScreen - favidx', favidx)

	return (
		<View>
			<Text>FavoriteDetailScreen</Text>
		</View>
	)
}

export default FavoriteDetailScreen
