import * as Linking from 'expo-linking'

const prefix = Linking.createURL('/')

const navigationConfig = {
	prefixes: [prefix],
	config: {
		path: 'home',
		initialRouteName: 'Songs',
		screens: {
			Songs: 'songs/:songId',
			Artists: 'artists/:artistId',
			Favorites: 'favorites',
			Playlists: 'playlists/:playlistId',
		},
	},
}

export default navigationConfig
