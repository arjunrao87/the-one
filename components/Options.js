import Config from 'react-native-config'
import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  Alert,
  TouchableHighlight,
  View,
} from 'react-native';
const timer = require('react-native-timer');

const MAX_NUMBER_OF_REQUESTS = 1;
var cache = {};
var lastRequest = {};
var counters = {'food' : 0, 'drinks' : 0, 'cafe' : 0, 'random' : 0 };
var baseURL = "http://localhost:8080/";

class Options extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      latitude : "40.7128",
      longitude : "-74.0059",
      location: null,
      errorMessage: null,
      foodCounter:0,
      cafeCounter:0,
      drinksCounter:0,
      randomCounter:0,
    };
    setInterval(clearCache, 600*1000);
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

  getFoodOption = ()=>{
    if( counters.food < MAX_NUMBER_OF_REQUESTS ){
      {this.makeRequest("food", this.props.menuOptions.price, this.props.menuOptions.distance)}
      counters['food'] = counters.food + 1;
      timer.setTimeout("foodRequestTimer", resetFoodCounter, 120000);
    } else{
      Alert.alert( "You can't choose another food option for 2 mins since your last one!" );
    }
  }
  getCafeOption= ()=>{
    if( counters.cafe < MAX_NUMBER_OF_REQUESTS ){
      {this.makeRequest("cafe", this.props.menuOptions.price, this.props.menuOptions.distance)}
      counters['cafe'] = counters.cafe + 1;
      timer.setTimeout("cafeRequestTimer", resetCafeCounter, 120000);
    } else{
      Alert.alert( "You can't choose another cafe option for 2 mins since your last one!" );
    }
  }
  getDrinksOption= ()=>{
    if( counters.drinks < MAX_NUMBER_OF_REQUESTS ){
      {this.makeRequest("drinks", this.props.menuOptions.price, this.props.menuOptions.distance)}
      counters['drinks'] = counters.drinks + 1;
      timer.setTimeout("drinksRequestTimer", resetDrinksCounter, 120000);
    } else{
      Alert.alert( "You can't choose another drinks option for 2 mins since your last one!" );
    }
  }
  getRandomOption= ()=>{
    if( counters.random < MAX_NUMBER_OF_REQUESTS ){
      {this.makeRequest("random", this.props.menuOptions.price, this.props.menuOptions.distance)}
      counters['random'] = counters.random + 1;
      timer.setTimeout("randomRequestTimer", resetRandomCounter, 120000);
    } else{
      Alert.alert( "You can't choose another random option for 2 mins since your last one!" );
    }
  }

  makeRequest(type, menuPrice, menuDistance) {
    {var latitude  = this.getLatitude()}
    {var longitude = this.getLongitude()}
    console.log( "Requesting data for " + type );
    var venue = null;
    if( ( menuDistance != lastRequest.distance) && (menuPrice != lastRequest.price) ){
      console.log( "Menu options were changed. Will re-request data for new parameters... ");
      lastRequest['price'] =  menuPrice;
      lastRequest['distance'] =  menuDistance;
      clearCache();
    }
    if( type in cache ){
      console.log( "Found cached "+type+" value" );
      if( type == "food"){
        venue = getOneVenue(cache.food);
      }
      if( type == "cafe"){
        venue = getOneVenue(cache.cafe);
      }
      if( type == "drinks"){
        venue = getOneVenue(cache.drinks);
      }
      if( type == "random"){
        venue = getOneVenue(cache.random);
      }
    }
    if( venue == null ){
      var checkForPrice = '1';
      if( menuPrice == 2 ){
        checkForPrice = '1,2';
      }
      if( menuPrice == 3 ){
        checkForPrice = '1,2,3';
      }
      if( menuPrice == 4 ){
        checkForPrice = '1,2,3,4';
      }
      makePostRequest(baseURL + type, menuDistance, checkForPrice, latitude, longitude )
      .then((response) => {
        venue = getVenue(response, type);
        this.props.retrieveVenue(venue);
      })
      .catch((error) => {
        console.error(error);
      });
    } else{
      this.props.retrieveVenue( venue );
    }
  }

  getLatitude=()=>{
    if( this.props.location && this.props.location.coords.latitude ){
      console.log( "Getting actual user latitude - " + this.props.location.coords.latitude );
      return this.props.location.coords.latitude;
    } else{
      console.log( "Getting fake user latitude - " + this.state.latitude );
      return this.state.latitude;
    }
  }

  getLongitude(){
    if( this.props.location && this.props.location.coords.longitude ){
      console.log( "Getting actual user longitude - " + this.props.location.coords.longitude );
      return this.props.location.coords.longitude;
    } else{
      console.log( "Getting fake user longitude - " + this.state.longitude );
      return this.state.longitude;
    }
  }
};

// ----------------------------- Request Helpers ----------------------------//

function clearCache(){
  console.log( "Cleared cache..." );
  cache = {};
}

function resetFoodCounter(){
  console.log( "Resetting food counter after timeout." );
  counters['food'] = 0;
}

function resetCafeCounter(){
  console.log( "Resetting cafe counter after timeout." );
  counters['cafe'] = 0;
}

function resetDrinksCounter(){
  console.log( "Resetting drinks counter after timeout." );
  counters['drinks'] = 0;
}

function resetRandomCounter(){
  console.log( "Resetting random counter after timeout." );
  counters['random'] = 0;
}

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
