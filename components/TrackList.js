import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native'
import {FlashList} from '@shopify/flash-list'
import Ionicons from '@expo/vector-icons/Ionicons'
import TrackPlayer, {useActiveTrack} from 'react-native-track-player'

// import {getMusicData} from '../helper/musicFunctions'

import {defaultArtwork, colors, fontSize} from '../helper/constants'

const TrackList = ({data}) => {
	// const data = getMusicData()

	const renderItem = ({item, index}) => {
		// const isActiveTrack = useActiveTrack()?.url === item.url

		return (
			<TouchableOpacity
				style={[styles.container]}
				onPress={() => {
					console.log('TrackList-item')
				}}
			>
				<Image source={item.artwork ? {uri: item.artwork} : defaultArtwork} style={styles.image} />
				<View
					style={{
						flex: 1,
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'space-between',
						paddingRight: 16,
						borderBottomWidth: index === data.length - 1 ? 0 : 1,
						borderBottomColor: colors.textMuted,
						paddingTop: 5,
						paddingBottom: 15,
					}}
				>
					<View style={[styles.textContainer, {}]}>
						<Text style={styles.title} numberOfLines={1}>
							{item.title}
						</Text>
						<Text style={styles.artist}>{item.artist ?? 'Unknown Artist'}</Text>
					</View>
					<TouchableOpacity
						onPress={() => {
							console.log('TrackList-item.Icon')
						}}
					>
						<Ionicons name='ellipsis-horizontal' size={16} color={colors.text} />
					</TouchableOpacity>
				</View>
			</TouchableOpacity>
		)
	}
	return (
		<FlashList
			// data={searchData.length > 0 ? searchData : data}
			data={data}
			renderItem={(item, index) => renderItem(item, index)}
			estimatedItemSize={data.length}
			keyExtractor={(item) => item.url}
			contentContainerStyle={{paddingTop: 16, paddingBottom: 100}}
			ListHeaderComponent={() => <View style={{height: 1, width: '100%', backgroundColor: colors.textMuted}} />}
			ListFooterComponent={() => <View style={{height: 1, width: '100%', backgroundColor: colors.textMuted}} />}
		/>
	)
}

export default TrackList

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 16,
		paddingVertical: 5,
	},
	image: {
		width: 50,
		height: 50,
		borderRadius: 10,
	},
	textContainer: {
		flex: 1,
	},
	title: {
		// width: 220,
		fontSize: fontSize.sm,
		fontWeight: '500',
		color: colors.text,
	},
	artist: {
		fontSize: fontSize.xs,
		color: colors.textMuted,
	},
})
