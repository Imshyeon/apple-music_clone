import {View, Text} from 'react-native'

const SongDetailScreen = ({route}) => {
	const {songId} = route.params

	console.log('SongDetailScreen - songId', songId)

	return (
		<View>
			<Text>SongDetailScreen</Text>
		</View>
	)
}

export default SongDetailScreen
