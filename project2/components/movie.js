import React from 'react';
import {
  FlatList,
  TouchableHighlight,
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import Movie from './movie';
// import { search } from '../assets/mockData';
import { apiKey, host } from '../assets/api';

const styles = StyleSheet.create({
  item: {
    padding: 5,
  },
  input: {
    padding: 10,
    color: 'black'
  },
});
export default class MovieList extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      searchText: '',
      showCharacterError: true,
    };
  }
  navigateToMovie = id => {
    this.props.navigation.navigate('movie', { imdbID: id });
  };
  fetchResults = async text => {
    const res = await fetch(`${host}?apikey=${apiKey}&s=${text}`);
    const json = await res.json();
    return json;
  };
  handleSearch = text => {
    // console.log(text);
    if (text.length > 2) {
      this.fetchResults(text).then(res => {
        this.setState(prevState => {
          prevState.movies = res.Search;
          prevState.showCharacterError = false;
          return prevState;
        });
      });
    } else {
      this.setState({ movies: [], showCharacterError: true });
    }
  };
  _keyExtractor = (item, index) => item.imdbID;
  item = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => this.navigateToMovie(item.imdbID)}
        key={item.imdbID}>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <Image
            style={{ width: 50, height: 50, borderRadius: 50, margin: 10 }}
            source={{ uri: item.Poster }}
          />
          <View>
            <Text style={{ fontWeight: 'bold' }}>{item.Title}</Text>
            <Text>{item.Year}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  render() {
    return (
      <View>
        <TextInput
          style={styles.input}
          placeholder="Search movies..."
          onChangeText={this.handleSearch}
        />
        <ScrollView>
          {this.state.showCharacterError && (
            <Text>Enter 3 or more characters to search</Text>
          )}
          <FlatList
            keyExtractor={this._keyExtractor}
            data={this.state.movies}
            renderItem={this.item}
          />
        </ScrollView>
      </View>
    );
  }
}
