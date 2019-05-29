import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
// import { movie } from '../assets/mockData';
import { apiKey, host } from '../assets/api';
const styles = StyleSheet.create({
  item: {
    padding: 15,
    flex: 1
  },
});
export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    const imdbID = this.props.navigation.getParam('imdbID');
    this.state = {
      movie: {},
    };
    this.fetchMovie(imdbID).then(movie => {
      console.log(movie);
      this.setState({
        movie: movie,
      });
    });
  }
  fetchMovie = async imdbID => {
    const res = await fetch(`${host}?apikey=${apiKey}&i=${imdbID}`);
    const json = await res.json();
    return json;
  };
  render() {
    return (
      <View style={styles.item}>
        <Text style={{fontWeight: 'bold', fontSize: 28, paddingBottom: 5}}>{this.state.movie.Title}</Text>
        <Image
          style={{ width: null, height: 100, flex: 1 }}
          source={{ uri: this.state.movie.Poster }}
        />
        
      </View>
    );
  }
}
