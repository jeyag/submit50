import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Constants } from 'expo';

import { createStackNavigator, createAppContainer } from 'react-navigation';
// or any pure javascript modules available in npm
// import { Card } from 'react-native-paper';
import MovieList from './components/movieList';
import Movie from './components/movie';

const StackNavigator = createStackNavigator(
  {
    movie: { screen: Movie, navigationOptions: { title: 'Movie details' } },
    movieList: {screen: MovieList, navigationOptions: {title: 'Search Movies'}},
  },
  {
    initialRouteName: 'movieList',
  }
);

export default createAppContainer(StackNavigator);
// export default class App extends React.Component {
//   render() {
//     return <StackNavigator />;
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     paddingTop: Constants.statusBarHeight,
//     backgroundColor: '#ecf0f1',
//     padding: 8,
//   },
//   paragraph: {
//     margin: 24,
//     fontSize: 18,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
// });
