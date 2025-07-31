import {useState, useLayoutEffect, useCallback} from 'react'
import {useNavigation} from '@react-navigation/native'

import {colors} from './constants'

const useNavigationSearch = () => {
	const navigation = useNavigation()
	const parentNavigation = navigation.getParent()

	const [search, setSearch] = useState('')

	const handleSearch = useCallback((text) => {
		setSearch(text)
	}, [])

	useLayoutEffect(() => {
		if (!parentNavigation) {
			return
		}

		parentNavigation.setOptions({
			headerSearchBarOptions: {
				placeholder: 'Find in songs',
				placeholderTextColor: colors.textMuted,
				onChangeText: (event) => handleSearch(event.nativeEvent.text),
			},
		})

		return () => {
			parentNavigation.setOptions({
				headerSearchBarOptions: undefined,
			})
		}
	}, [parentNavigation, handleSearch])

	return {search}
}

export default useNavigationSearch
