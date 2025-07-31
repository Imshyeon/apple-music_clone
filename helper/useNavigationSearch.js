import {useState, useLayoutEffect} from 'react'
import {useNavigation} from '@react-navigation/native'

import {colors} from './constants'

import musics from '../assets/dummy-data.json'

const useNavigationSearch = () => {
	const navigation = useNavigation()

	const [search, setSearch] = useState('')
	const [searchResults, setSearchResults] = useState(musics)

	const handleSearch = (text) => {
		setSearch(text)
		const searchText = (text || '').toLowerCase()
		const results = musics.filter((item) => {
			const title = item.title ? item.title.toLowerCase() : ''
			const artist = item.artist ? item.artist.toLowerCase() : ''
			return title.includes(searchText) || artist.includes(searchText)
		})
		setSearchResults(results)
	}

	useLayoutEffect(() => {
		navigation.setOptions({
			headerStyle: {
				backgroundColor: 'transparent',
			},
			headerBlurEffect: 'dark',
			headerSearchBarOptions: {
				placeholder: 'Find in songs',
				hintTextColor: colors.text,
				textColor: colors.text,
				headerIconColor: colors.text,
				hideWhenScrolling: true,
				hideNavigationBar: true,
				onChangeText: (event) => handleSearch(event.nativeEvent.text),
			},
		})
	}, [navigation])

	return {search, searchResults}
}

export default useNavigationSearch
