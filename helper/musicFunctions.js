const musicData = require('../assets/dummy-data.json')

export const getMusicData = () => {
	return musicData.map((item, index) => ({...item, id: index}))
}

export const getMusicDataBySearch = (search) => {
	return musicData.filter((item) => item.title.toLowerCase().includes(search.toLowerCase()) || item.artist.toLowerCase().includes(search.toLowerCase()))
}
