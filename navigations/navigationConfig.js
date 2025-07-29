import * as Linking from 'expo-linking'

const prefix = Linking.createURL('/')

const navigationConfig = {
	prefixes: [prefix],
	config: {
		path: 'home',
		initialRouteName: 'Songs',
		screens: {
			Songs: {
				initialRouteName: 'Songs',
				screens: {
					Songs: 'songs',
					SongDetail: 'songs/:sidx',
				},
			},
			Artists: {
				initialRouteName: 'Artists',
				screens: {
					Artists: 'artists',
					ArtistDetail: 'artists/:atidx',
				},
			},
			Favorites: {
				initialRouteName: 'Favorites',
				screens: {
					Favorites: 'favorites',
					FavoriteDetail: 'favorites/:favidx',
				},
			},
			Playlists: {
				initialRouteName: 'Playlists',
				screens: {
					Playlists: 'playlists',
					PlaylistDetail: 'playlists/:plidx',
				},
			},
		},
	},
}

export default navigationConfig
