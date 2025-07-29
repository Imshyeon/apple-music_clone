import {View, Text} from 'react-native'

const PlaylistDetailScreen = ({route}) => {
	const {plidx} = route.params

	console.log('PlaylistDetailScreen - plidx', plidx)

	return (
		<View>
			<Text>PlaylistDetailScreen</Text>
		</View>
	)
}

export default PlaylistDetailScreen
