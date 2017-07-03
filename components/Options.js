import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { Constants, Location, Permissions } from 'expo';

const baseURL = 'http://localhost:3000/';
const GEOLOCATION_OPTIONS = { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 };
var cache = {};

class Options extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      radius : "500",
      price : "1,2,3,4",
      latitude : "40.7128",
      longitude : "-74.0059",
      location: null,
      errorMessage: null,
    };
    setInterval(clearCache, 300*1000);
  }

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      console.log( "Component mounted");
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }
    let location = await Location.getCurrentPositionAsync(GEOLOCATION_OPTIONS);
    this.setState({ location });
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <TouchableHighlight underlayColor='chartreuse' style={{flex: 1, backgroundColor: 'mediumorchid'}} onPress={this.getCafeOption}>
          <Text style={styles.optionText}>Cafes</Text>
        </TouchableHighlight>
        <TouchableHighlight underlayColor='chartreuse' style={{flex: 1, backgroundColor: 'darkorange'}} onPress={this.getRandomOption}>
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
    var venue = null;
    if( "food" in cache ){
      console.log( "Found cached food value" );
      venue = getOneVenue(cache.food);
    }
    if( venue == null ){
      makePostRequest(baseURL + 'food', this.state.radius, this.state.price, this.state.latitude, this.state.longitude )
      .then((response) => {
        venue = getVenue(response, "food");
        this.props.retrieveVenue(venue);
      })
      .catch((error) => {
        console.error(error);
      });
    } else{
      this.props.retrieveVenue( venue );
    }
  };
  getDrinksOption = () => {
    var venue = null;
    if( "drinks" in cache ){
      console.log( "Found cached drinks value" );
      venue = getOneVenue(cache.drinks);
    }
    if( venue == null ){
      makePostRequest(baseURL + 'drinks', this.state.radius, this.state.price, this.state.latitude, this.state.longitude)
      .then((response) => {
        var venue = getVenue(response, "drinks");
        this.props.retrieveVenue(venue);
      })
      .catch((error) => {
        console.error(error);
      });
    }
    else{
      this.props.retrieveVenue( venue );
    }
  };
  getCafeOption = () => {
    var venue = null;
    if( "cafe" in cache ){
      console.log( "Found cached cafe value" );
      venue = getOneVenue(cache.cafe);
    }
    if( venue == null ){
      makePostRequest(baseURL + 'cafe', this.state.radius, this.state.price,  this.state.latitude, this.state.longitude)
      .then((response) => {
        var venue = getVenue(response, "cafe");
        this.props.retrieveVenue(venue);
      })
      .catch((error) => {
        console.error(error);
      });
    } else{
      this.props.retrieveVenue( venue );
    }
  };
  getRandomOption = () => {
    var venue = null;
    if( "random" in cache ){
      console.log( "Found cached random value" );
      venue = getOneVenue(cache.random);
    }
    if( venue == null ){
      makePostRequest(baseURL + 'random', this.state.radius, this.state.price, this.state.latitude, this.state.longitude)
      .then((response) => {
        var venue = getVenue(response, "random");
        this.props.retrieveVenue(venue);
      })
      .catch((error) => {
        console.error(error);
      });
    } else{
      this.props.retrieveVenue( venue );
    }
  };
}

function clearCache(){
  console.log( "Cleared cache..." );
  cache = {};
}

// ----------------------------- Request Helpers ----------------------------//

function getVenue( response, key ){
  var body = JSON.parse(response)._bodyInit;
  var venues = JSON.parse(body);
  var venue = null;
  if( venues ){
    console.log( "Storing " + key + " venues in cache..." );
    cache[key] = venues;
    venue = getOneVenue( venues );
  } else{
    console.log( "Unable to retrieve venues for this category" );
  }
  return venue;
}

function getOneVenue( venues ){
  var item = Math.floor(Math.random()*venues.length);
  var venue = null;
  if ( venues[item] ){
    venue = venues[item].venue;
    console.log( "Choosing item # = " + item + ", value = " +  venue.name );
  }
  return venue;
}

function makePostRequest(url,radius,price,latitude,longitude){
  console.log( "Making request to " + url );
  return fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      latitude : latitude,
      longitude : longitude,
      radius: radius,
      price: price,
    })
  }).then((response)=>{
    var resp = JSON.stringify( response);
    return resp;
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
