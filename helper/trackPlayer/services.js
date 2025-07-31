// https://dev.to/amitkumar13/building-a-custom-music-player-in-react-native-with-react-native-track-player-8gb
import TrackPlayer, {Event} from 'react-native-track-player'

module.exports = async () => {
	try {
		TrackPlayer.addEventListener(Event.RemotePlay, () => TrackPlayer.play())
		TrackPlayer.addEventListener(Event.RemotePause, () => TrackPlayer.pause())
		TrackPlayer.addEventListener(Event.RemoteStop, () => TrackPlayer.stop())
		TrackPlayer.addEventListener(Event.RemoteNext, () => TrackPlayer.skipToNext())
		TrackPlayer.addEventListener(Event.RemotePrevious, () => TrackPlayer.skipToPrevious())
		TrackPlayer.addEventListener('remote-seek', async ({position}) => {
			await TrackPlayer.seekTo(position)
		})
	} catch (e) {
		console.error(e)
	}
}
