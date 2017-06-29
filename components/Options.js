import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

const baseURL = 'http://localhost:3000/';
// Dummy variables for now. Can sub with real values down the road.
var distance = 1;
var cost = 1;
var rating = 1;

class Options extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <TouchableHighlight underlayColor='chartreuse' style={{flex: 1, backgroundColor: 'plum'}} onPress={this.getCafeOption}>
          <Text style={styles.optionText}>Cafes</Text>
        </TouchableHighlight>
        <TouchableHighlight underlayColor='chartreuse' style={{flex: 1, backgroundColor: 'salmon'}} onPress={this.getRandomOption}>
          <Text style={styles.optionText}>Random</Text>
        </TouchableHighlight>
        <TouchableHighlight underlayColor='chartreuse' style={{flex: 1, backgroundColor: 'dodgerblue'}} onPress={this.getFoodOption}>
          <Text style={styles.optionText}>Food</Text>
        </TouchableHighlight>
        <TouchableHighlight underlayColor='chartreuse' style={{flex: 1, backgroundColor: 'deeppink'}} onPress={this.getDrinksOption}>
          <Text style={styles.optionText}>Drinks</Text>
        </TouchableHighlight>
      </View>
    );
  }

  getFoodOption = () => {
    makePostRequest(baseURL + 'food', distance, cost, rating)
    .then((response) => {
      var venue = getVenue(response);
      this.props.retrieveVenue(venue);
    })
    .catch((error) => {
      console.error(error);
    });
  };
  getDrinksOption = () => {
    makePostRequest(baseURL + 'drinks', distance, cost, rating)
    .then((response) => {
      var venue = getVenue(response);
      this.props.retrieveVenue(venue);
    })
    .catch((error) => {
      console.error(error);
    });
  };
  getCafeOption = () => {
    makePostRequest(baseURL + 'cafe', distance, cost, rating)
    .then((response) => {
      var venue = getVenue(response);
      this.props.retrieveVenue(venue);
    })
    .catch((error) => {
      console.error(error);
    });
  };
  getRandomOption = () => {
    makePostRequest(baseURL + 'random', distance, cost, rating)
    .then((response) => {
      var venue = getVenue(response);
      this.props.retrieveVenue(venue);
    })
    .catch((error) => {
      console.error(error);
    });
  };
}

// ----------------------------- Request Helpers ----------------------------//

function getVenue( response ){
  var body = JSON.parse(response)._bodyInit;
  var venues = JSON.parse( body );
  var venue = getOneVenue( venues );
  return venue;
}

function getOneVenue( venues ){
  var item = Math.floor(Math.random()*venues.length);
  var venue = venues[item];
  console.log( "Choosing item # = " + item + ", value = " +  venue.name );
  return venue;
}

function makePostRequest(url,distance,cost,rating){
  console.log( "Making request to " + url );
  return fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
       distance: distance,
       cost: cost,
       rating:rating,
    })
  }).then((response)=>{
    var resp = JSON.stringify( response);
    return resp;
  });
}

function makeGetRequest(type,distance,cost,rating){
  console.log( "Making get request for type = " + type );
  var response = fetch(baseURL + type);
  response.then( (response) => {
    var resp = JSON.stringify( response);
    console.log(resp);
    return( resp );
  });
}

const styles = StyleSheet.create({
  optionText: {
    fontSize: 45,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontFamily: 'Iowan Old Style',
  },
});

module.exports = Options;
