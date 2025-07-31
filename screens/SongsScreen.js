import {ScrollView} from 'react-native'

import {defaultStyles} from '../helper/styles'
import useNavigationSearch from '../helper/useNavigationSearch'

import TrackList from '../components/TrackList'

const SongsScreen = () => {
	const {searchResults} = useNavigationSearch()

	return (
		<ScrollView contentInsetAdjustmentBehavior='automatic' style={[defaultStyles.container, {flex: 1, position: 'relative'}]}>
			<TrackList data={searchResults} />
		</ScrollView>
	)
}

export default SongsScreen
