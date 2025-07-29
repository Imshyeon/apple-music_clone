import {Text} from 'react-native'
import {ScrollView} from 'react-native-gesture-handler'
import {useLayoutEffect, useRef} from 'react'
import {useDisplayHeader} from '../helper/useDisplayHeader'

import {defaultStyles} from '../helper/styles'

const SongsScreen = ({navigation}) => {
	const scrollViewRef = useRef(null)
	// console.log('SongsScreen - scrollViewRef', scrollViewRef)
	const {headerShown, headerTintColor, headerBackground} = useDisplayHeader(scrollViewRef)

	// useLayoutEffect(() => {
	// navigation.setOptions({headerShown, headerTintColor, headerBackground})
	// }, [headerShown, headerTintColor, headerBackground])

	return (
		<ScrollView ref={scrollViewRef} style={defaultStyles.container}>
			<Text>Songs</Text>
		</ScrollView>
	)
}

export default SongsScreen
