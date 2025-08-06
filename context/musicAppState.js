import {createContext, useReducer, useContext} from 'react'
import {State} from 'react-native-track-player'

const MusicState = createContext()
const MusicDispatch = createContext()

const initialState = {
	activeTrack: null,
	activeTrackIndex: 0,
	playerState: {state: State.None},
	position: 0,
	duration: 0,
}

const reducer = (state, action) => {
	switch (action.type) {
		case 'SET_ACTIVE_TRACK':
			return {...state, activeTrack: action.payload}
		case 'SET_ACTIVE_TRACK_INDEX':
			return {...state, activeTrackIndex: action.payload}
		case 'SET_PLAYER_STATE':
			return {...state, playerState: action.payload}
		case 'SET_POSITION':
			return {...state, position: action.payload}
		case 'SET_DURATION':
			return {...state, duration: action.payload}
		default:
			return state
	}
}

const MusicStoreProvider = ({children}) => {
	const [state, dispatch] = useReducer(reducer, initialState)

	return (
		<MusicState.Provider value={state}>
			<MusicDispatch.Provider value={dispatch}>{children}</MusicDispatch.Provider>
		</MusicState.Provider>
	)
}

export const useMusicState = () => {
	const context = useContext(MusicState)
	if (!context) {
		throw new Error('useMusicState must be used within a MusicStoreProvider')
	}
	return context
}

export const useMusicDispatch = () => {
	const context = useContext(MusicDispatch)
	if (!context) {
		throw new Error('useMusicDispatch must be used within a MusicStoreProvider')
	}
	return context
}

export default MusicStoreProvider
