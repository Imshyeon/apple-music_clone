import TrackPlayer, {Event, useTrackPlayerEvents} from 'react-native-track-player'

const events = [Event.PlaybackState, Event.PlaybackError, Event.RemotePlay, Event.RemotePause, Event.RemoteStop, Event.RemoteNext, Event.RemotePrevious, Event.PlaybackActiveTrackChanged]

export const useLogTrackPlayer = () => {
	useTrackPlayerEvents(events, async (event) => {
		if (event.type === Event.PlaybackError) {
			console.warn('An error occurred while playing the track - event:', event)
		}

		if (event.type === Event.PlaybackState) {
			console.log('Playback state changed - event:', event)
		}

		if (event.type === Event.PlaybackActiveTrackChanged) {
			console.log('Playback active track changed - event:', event)
		}
	})
}
