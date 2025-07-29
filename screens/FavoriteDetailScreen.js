import {View, Text} from 'react-native'

const FavoriteDetailScreen = ({route}) => {
	const {favId} = route.params

	console.log('FavoriteDetailScreen - favId', favId)

	return (
		<View>
			<Text>FavoriteDetailScreen</Text>
		</View>
	)
}

export default FavoriteDetailScreen
