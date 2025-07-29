import {View, Text} from 'react-native'

const PlaylistDetailScreen = ({route}) => {
	const {plId} = route.params

	console.log('PlaylistDetailScreen - plId', plId)

	return (
		<View>
			<Text>PlaylistDetailScreen</Text>
		</View>
	)
}

export default PlaylistDetailScreen
