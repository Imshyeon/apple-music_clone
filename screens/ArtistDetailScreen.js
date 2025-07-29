import {View, Text} from 'react-native'

const ArtistDetailScreen = ({route}) => {
	const {atidx} = route.params

	console.log('ArtistDetailScreen - atidx', atidx)

	return (
		<View>
			<Text>ArtistDetailScreen</Text>
		</View>
	)
}

export default ArtistDetailScreen
