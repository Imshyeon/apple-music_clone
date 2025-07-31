import * as Linking from 'expo-linking'

const prefix = Linking.createURL('/')

const navigationConfig = {
	prefixes: [prefix],
	config: {
		// 최상위 네비게이터가 Tab Navigator.
		screens: {
			PlaylistsTab: {
				path: 'playlists', // URL 경로: yourapp://playlists
				screens: {
					// PlaylistsTab 내부의 Stack Navigator에 있는 화면들
					PlaylistsList: 'playlists', // yourapp://playlists/list
					PlaylistDetail: 'playlists/:id', // yourapp://playlists/detail/123 (id는 파라미터)
				},
			},
			ArtistsTab: {
				path: 'artists', // URL 경로: yourapp://artists
				screens: {
					ArtistsList: 'artists',
					ArtistDetail: 'artists/:id',
				},
			},
			SongsTab: {
				path: 'songs', // URL 경로: yourapp://songs
				screens: {
					SongsList: 'songs',
					SongDetail: 'songs/:id',
				},
			},
			FavoritesTab: {
				path: 'favorites', // URL 경로: yourapp://favorites
				screens: {
					FavoritesList: 'favorites',
					FavoriteDetail: 'favorites/:id',
				},
			},
		},
	},
}

export default navigationConfig
