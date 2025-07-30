const musicData = require('../assets/dummy-data.json')

export const getMusicData = () => {
	return musicData.map((item, index) => ({...item, id: index}))
}
