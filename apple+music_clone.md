# 애플뮤직 클론코딩하기 (+) React-Native 정리

🔗 [youtube: Build a Music Player app with React Native, Expo, Typescript and Zustand](https://www.youtube.com/watch?v=9CElrkFwiBU)<br/>
🔗 [github: music-player](https://github.com/CodeWithGionatha-Labs/music-player)<br/>

## 🍏 Project Setup

> git clone <git 주소><br/>
> npx create-expo-app --template blank .<br/>
> npx expo install expo-linking react-native-screens react-native-safe-area-context expo-constants expo-status-bar<br/>
> npm install @react-navigation/native react-native-gesture-handler<br/>

### 1. /screens/ArtistsScreen.js, FavoritesScreen.js, PlaylistsScreen.js, SongsScreen.js 생성

```js
import {View, Text} from 'react-native'

const ArtistsScreen = () => {
	return (
		<View>
			<Text>Artists</Text>
		</View>
	)
}

export default ArtistsScreen
```

모든 스크린 페이지들 우선 위와 같이 세팅

### 2. /navigators/MainBottomTabNavigator.js, StackNavigator.js 생성

#### `MainBottomTabNavigator.js`

```js
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

const Tab = createBottomTabNavigator()

import ArtistsScreen from '../screens/ArtistsScreen'
import FavoritesScreen from '../screens/FavoritesScreen'
import PlaylistsScreen from '../screens/PlaylistsScreen'
import SongsScreen from '../screens/SongsScreen'

const MainBottomTabNavigator = () => {
	return (
		<Tab.Navigator initialRoute='Songs'>
			<Tab.Screen name='Songs' component={SongsScreen} />
			<Tab.Screen name='Artists' component={ArtistsScreen} />
			<Tab.Screen name='Favorites' component={FavoritesScreen} />
			<Tab.Screen name='Playlists' component={PlaylistsScreen} />
		</Tab.Navigator>
	)
}

export default MainBottomTabNavigator
```

#### `StackNavigator.js`

```js
import {createStackNavigator} from '@react-navigation/stack'

const Stack = createStackNavigator()

import MainBottomTabNavigator from './MainBottomTabNavigator'
import SongsScreen from '../screens/SongsScreen'
import ArtistsScreen from '../screens/ArtistsScreen'
import FavoritesScreen from '../screens/FavoritesScreen'
import PlaylistsScreen from '../screens/PlaylistsScreen'

const StackNavigator = () => {
	return (
		<Stack.Navigator screenOptions={{headerShown: false}}>
			<Stack.Screen name='Home' component={MainBottomTabNavigator} />
			<Stack.Screen name='Songs' component={SongsScreen} />
			<Stack.Screen name='Artists' component={ArtistsScreen} />
			<Stack.Screen name='Favorites' component={FavoritesScreen} />
			<Stack.Screen name='Playlists' component={PlaylistsScreen} />
		</Stack.Navigator>
	)
}

export default StackNavigator
```

_단독으로 Home(MainBottomTabNavigator)만 있으면 deep-link가 제대로 적용이 안됨.._

### 3. Deep link

#### `app.json`

```json
{
	"expo": {
		"scheme": "myapp"
	}
}
```

#### `/navigations/navigationConfig.js`

```js
import * as Linking from 'expo-linking'

const prefix = Linking.createURL('/')

const navigationConfig = {
	prefixes: [prefix],
	config: {
		path: 'home',
		initialRouteName: 'Songs',
		screens: {
			Songs: 'songs/:songId',
			Artists: 'artists/:artistId',
			Favorites: 'favorites',
			Playlists: 'playlists/:playlistId',
		},
	},
}

export default navigationConfig
```

🔗 [React-Native Navigation. Deep-linking](https://reactnavigation.org/docs/deep-linking/?config=dynamic)<br/>
🔗 [React-Native Navigation. Configuring-links](https://reactnavigation.org/docs/configuring-links/)<br/>
🔗 [Expo에서 React Navigation과 DeepLink](https://velog.io/@hamster/Expo%EC%97%90%EC%84%9C-React-Navigation%EA%B3%BC-DeepLink)<br/>

### 4. App.js

```js
import {StatusBar} from 'expo-status-bar'
import {StyleSheet, View} from 'react-native'
import {NavigationContainer} from '@react-navigation/native'

import StackNavigator from './navigations/StackNavigator'
import navigationConfig from './navigations/navigationConfig'

export default function App() {
	return (
		<View style={styles.container}>
			<NavigationContainer linking={navigationConfig} r>
				<StackNavigator />
			</NavigationContainer>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
})
```

> npx uri-scheme open "exp://<ip주소>:<port>/--/home/favorites" --ios
