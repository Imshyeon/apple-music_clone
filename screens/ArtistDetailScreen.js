import {View, Text} from 'react-native'

const ArtistDetailScreen = ({route}) => {
	const {artistId} = route.params

	console.log('ArtistDetailScreen - artistId', artistId)

	return (
		<View>
			<Text>ArtistDetailScreen</Text>
		</View>
	)
}

export default ArtistDetailScreen
