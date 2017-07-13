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
import {baseURL} from './App';

var timer = require('react-native-timer');
var cache = {};
var lastRequest = {};
var lastFoodVenue=null;
var lastDrinksVenue = null;
var lastCafeVenue=null;
var lastRandomVenue=null;
var counters = {'food' : 0, 'drinks' : 0, 'cafe' : 0, 'random' : 0 };
var that = null;
var cafeInterval, foodInterval,randomInterval, drinksInterval = null;
const TIMEOUT = 120000;
const MAX_NUMBER_OF_REQUESTS = 1;

class Options extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      latitude : "40.7128",longitude : "-74.0059",location: null,
      errorMessage: null,
      foodTimer : null,drinksTimer : null,cafeTimer : null,randomTimer : null,
      cafePressed :false,foodPressed :false,drinksPressed :false,randomPressed :false,
    };
    setInterval(clearCache, 600*1000);
    that = this;
  }

  render() {
    var timer = null
    return (
      <View style={{flex: 1}}>
        <TouchableHighlight style={this.state.cafePressed ? styles.buttonPressed : styles.cafeButton} onPress={this.getCafeOption}>
          <View style={styles.centerify}>
            <Text style={styles.optionText}>Cafes</Text>
            <Text style={styles.timerText,styles.rightify}>{this.state.cafeTimer}</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight style={this.state.randomPressed ? styles.buttonPressed : styles.randomButton} onPress={this.getRandomOption}>
          <View style={styles.centerify}>
            <Text style={styles.optionText}>Random</Text>
            <Text style={styles.timerText,styles.rightify}>{this.state.randomTimer}</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight style={this.state.foodPressed ? styles.buttonPressed : styles.foodButton} onPress={this.getFoodOption}>
          <View style={styles.centerify}>
            <Text style={styles.optionText}>Food</Text>
            <Text style={styles.timerText,styles.rightify}>{this.state.foodTimer}</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight style={this.state.drinksPressed ? styles.buttonPressed : styles.drinksButton} onPress={this.getDrinksOption}>
          <View style={styles.centerify}>
            <Text style={styles.optionText}>Drinks</Text>
            <Text style={styles.timerText,styles.rightify}>{this.state.drinksTimer}</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }

  getFoodOption = ()=>{
    if( counters.food < MAX_NUMBER_OF_REQUESTS || !lastFoodVenue ){
      {this.makeRequest("food", this.props.menuOptions.price, this.props.menuOptions.distance)}
      counters['food'] = counters.food + 1;
      {this.setTimer( "food" )}
    } else{
      {this.showCached( "food", lastFoodVenue )}
    }
    this.setState({foodPressed:true});
    if( this.state.cafePressed ){
      this.setState( {cafePressed:false});
    }
    if( this.state.drinksPressed ){
      this.setState( {drinksPressed:false});
    }
    if( this.state.randomPressed ){
      this.setState( {randomPressed:false});
    }
  }
  setTimer(type){
    console.log( "Setting timer for type = " + type );
    var count = TIMEOUT/1000;
    var that = this;
    var typeInterval = setInterval( function(){
      if( type == "food" ){
        that.setState( {"foodTimer": count} );
      }
      if( type == "random" ){
        that.setState( {"randomTimer": count} );
      }
      if( type == "drinks" ){
        that.setState( {"drinksTimer": count} );
      }
      if( type == "cafe" ){
        that.setState( {"cafeTimer": count} );
      }
      count = count - 1;
      if ( count <= -1 ){
        {that.resetTimer(type)}
        if( type == "food" ){
          resetFoodCounter()
          {that.setState({"foodTimer":null})}
        }
        if( type == "random" ){
          resetRandomCounter()
          {that.setState({"randomTimer":null})}
        }
        if( type == "drinks" ){
          resetDrinksCounter()
          {that.setState({"drinksTimer":null})}
        }
        if( type == "cafe" ){
          resetCafeCounter()
          {that.setState({"cafeTimer":null})}
        }
      }
    }, 1000 );

    if( type == "food" ){
      foodInterval = typeInterval;
    }
    if( type == "random" ){
      randomInterval = typeInterval;
    }
    if( type == "drinks" ){
      drinksInterval = typeInterval;
    }
    if( type == "cafe" ){
      cafeInterval = typeInterval;
    }
  }
  resetTimer(type){
    if( type == "food" ){
      clearInterval(foodInterval)
    }
    if( type == "random" ){
      clearInterval(randomInterval)
    }
    if( type == "drinks" ){
      clearInterval(drinksInterval)
    }
    if( type == "cafe" ){
      clearInterval(cafeInterval)
    }
  }
  getCafeOption= ()=>{
    if( counters.cafe < MAX_NUMBER_OF_REQUESTS || !lastCafeVenue ){
      {this.makeRequest("cafe", this.props.menuOptions.price, this.props.menuOptions.distance)}
      counters['cafe'] = counters.cafe + 1;
      {this.setTimer( "cafe" )}
    } else{
      {this.showCached( "cafe", lastCafeVenue )}
    }
    this.setState({cafePressed:true});
    if( this.state.foodPressed ){
      this.setState( {foodPressed:false});
    }
    if( this.state.drinksPressed ){
      this.setState( {drinksPressed:false});
    }
    if( this.state.randomPressed ){
      this.setState( {randomPressed:false});
    }
  }
  getDrinksOption= ()=>{
    if( counters.drinks < MAX_NUMBER_OF_REQUESTS || !lastDrinksVenue ){
      {this.makeRequest("drinks", this.props.menuOptions.price, this.props.menuOptions.distance)}
      counters['drinks'] = counters.drinks + 1;
      {this.setTimer( "drinks" )}
    } else{
      {this.showCached( "drinks", lastDrinksVenue )}
    }
    this.setState({drinksPressed:true});
    if( this.state.cafePressed ){
      this.setState( {cafePressed:false});
    }
    if( this.state.foodPressed ){
      this.setState( {foodPressed:false});
    }
    if( this.state.randomPressed ){
      this.setState( {randomPressed:false});
    }
  }
  getRandomOption= ()=>{
    if( counters.random < MAX_NUMBER_OF_REQUESTS || !lastRandomVenue){
      {this.makeRequest("random", this.props.menuOptions.price, this.props.menuOptions.distance)}
      counters['random'] = counters.random + 1;
      {this.setTimer( "random" )}
    } else{
      {this.showCached( "random", lastRandomVenue )}
    }
    this.setState({randomPressed:true});
    if( this.state.cafePressed ){
      this.setState( {cafePressed:false});
    }
    if( this.state.drinksPressed ){
      this.setState( {drinksPressed:false});
    }
    if( this.state.foodPressed ){
      this.setState( {foodPressed:false});
    }
  }

  showCached( type, venue ){
    this.props.retrieveVenue(type, venue,"2 mins before you can request again!");
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
        lastFoodVenue = venue;
      }
      if( type == "cafe"){
        venue = getOneVenue(cache.cafe);
        lastCafeVenue = venue;
      }
      if( type == "drinks"){
        venue = getOneVenue(cache.drinks);
        lastDrinksVenue = venue;
      }
      if( type == "random"){
        venue = getOneVenue(cache.random);
        lastRandomVenue = venue;
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
        if( type == "food"){
          lastFoodVenue = venue;
        }
        if( type == "cafe"){
          lastCafeVenue = venue;
        }
        if( type == "drinks"){
          lastDrinksVenue = venue;
        }
        if( type == "random"){
          lastRandomVenue = venue;
        }
        this.props.retrieveVenue(type, venue);
      })
      .catch((error) => {
        console.error(error);
      });
    } else{
      this.props.retrieveVenue( type, venue )
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
  {that.props.resetMessage( "food" )}
}

function resetCafeCounter(){
  console.log( "Resetting cafe counter after timeout." );
  counters['cafe'] = 0;
  that.props.resetMessage( "cafe" );
}

function resetDrinksCounter(){
  console.log( "Resetting drinks counter after timeout." );
  counters['drinks'] = 0;
  that.props.resetMessage( "drinks" );
}

function resetRandomCounter(){
  console.log( "Resetting random counter after timeout." );
  counters['random'] = 0;
  that.props.resetMessage( "random" );
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
  centerify: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  rightify:{
    justifyContent: 'center',
    alignItems: 'flex-end',
    flex: 1,
  },
  optionText: {
    fontSize: 32,
    textAlign: 'center',
    fontFamily: 'Iowan Old Style',
  },
  timerText:{
    fontSize: 20,
    fontFamily: 'Iowan Old Style',
    paddingBottom:30,
    paddingRight:10,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  cafeButton:{
    flex: 1,
    backgroundColor: 'mediumorchid'
  },
  drinksButton:{
    flex: 1,
    backgroundColor: 'deeppink'
  },
  foodButton:{
    flex: 1,
    backgroundColor: 'dodgerblue',
    justifyContent: 'center',
  },
  randomButton:{
    flex: 1,
    backgroundColor: 'darkorange'
  },
  buttonPressed:{
    flex: 1,
    backgroundColor: 'gainsboro',
    borderWidth:5,
    borderColor:'black'
  },
});

module.exports = Options;
