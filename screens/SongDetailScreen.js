import {View, Text} from 'react-native'

const SongDetailScreen = ({route}) => {
	const {sidx} = route.params

	console.log('SongDetailScreen - sidx', sidx)

	return (
		<View>
			<Text>SongDetailScreen</Text>
		</View>
	)
}

export default SongDetailScreen
