import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  Alert,
  TouchableHighlight,
  View,
} from 'react-native';
import {baseURL} from '../App';
import {font} from '../App';
import {Permissions,Location,Constants} from 'expo';

var timer = require('react-native-timer');
var cache = {};
var lastRequest = {};

var lastFoodVenue=null;
var lastDrinksVenue = null;
var lastCafeVenue=null;
var lastRandomVenue=null;

var counters = {'food' : 0, 'drinks' : 0, 'cafe' : 0, 'random' : 0 };
var cafeInterval = []
var foodInterval = []
var randomInterval = []
var drinksInterval = [];

var that = null;

const TIMEOUT = 120000;
const MAX_NUMBER_OF_REQUESTS = 1;
const CACHE_CLEAR_MINS = 4;

class Options extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      location: null,
      errorMessage: null,
      foodTimer : null,drinksTimer : null,cafeTimer : null,randomTimer : null,
      cafePressed :false,foodPressed :false,drinksPressed :false,randomPressed :false,
    };
    setInterval(clearCache, CACHE_CLEAR_MINS * 60 * 1000);
    that = this;
    watchId = (null: ?number)
  }

  componentWillMount() {
    console.log( "Mounting options component...");
    if (Platform.OS === 'android' && !Constants.isDevice) {
      console.log( "Will not be requesting location params...");
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    console.log( "Attempting to get user location...");
    let { status } = await Permissions.askAsync(Permissions.LOCATION)
    let counter = 0
    if (status === 'granted') {
      console.log( "Granted permission to get user location...");
      this.watchId = Location.watchPositionAsync({
        enableHighAccuracy: true,
        distanceInterval: 100,
        timeInterval: 60000
      }, newLoc => {
        this.setState({ location:newLoc });
        console.log('Options Current Location = ', JSON.stringify(newLoc))
        {this.sendMetrics( newLoc );}
        counter++
      })
    } else {
      console.log('Error in getLocationAsync: Permission to access location was denied')
    }
  };

  componentWillUnmount() {
     Alert.alert('Component unmounting!')
     this.watchId.remove()
  }

  sendMetrics(location){
    var latitude = null;
    var longitude = null;
    if( location ){
      latitude = location.coords.latitude;
      longitude = location.coords.longitude;
    }
    var os = Platform.OS;
    var osVersion = null;
    var date = new Date();
    var offset = date.getTimezoneOffset();
    if( os == "Android" ){
      osVersion = Platform.Version;
    }
    console.log( "User info ==> Latitude  = " + latitude + ", longitude = " + longitude + ", os = " + os + ", osVersion = " + osVersion + ", date = " + date + ", offset = " + offset );
    {this.makePostRequest(baseURL+"metrics", os,osVersion,latitude,longitude,date,offset)}
  }

  makePostRequest(url,os,osVersion,latitude,longitude,date,offset){
    console.log( "Making request to " + url );
    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        latitude : latitude,
        longitude : longitude,
        os: os,
        osVersion : osVersion,
        date : date,
        offset :offset
      })
    });
  }

  render() {
    if (!this.state.location) {
      return (
        <View style={{flex: 1}}>
          <TouchableHighlight style={styles.waitForLocation}>
            <View style={styles.centerify}>
              <Text style={styles.optionText }>Waiting to obtain your location...</Text>
            </View>
          </TouchableHighlight>
        </View>
      );
    }
    return (
      <View style={{flex: 1}}>
        <TouchableHighlight underlayColor="floralwhite" style={styles.cafeButton} onPress={this.getCafeOption}>
          <View style={styles.centerify}>
            <Text style={this.state.cafePressed ? styles.optionTextPressed : styles.optionText }>Cafes</Text>
            <Text style={styles.timerText,styles.rightify}>{this.state.cafeTimer}</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight underlayColor="floralwhite" style={styles.randomButton} onPress={this.getRandomOption}>
          <View style={styles.centerify}>
            <Text style={this.state.randomPressed ? styles.optionTextPressed : styles.optionText }>Random</Text>
            <Text style={styles.timerText,styles.rightify}>{this.state.randomTimer}</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight underlayColor="floralwhite" style={styles.foodButton} onPress={this.getFoodOption}>
          <View style={styles.centerify}>
            <Text style={this.state.foodPressed ? styles.optionTextPressed : styles.optionText }>Food</Text>
            <Text style={styles.timerText,styles.rightify}>{this.state.foodTimer}</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight underlayColor="floralwhite" style={styles.drinksButton} onPress={this.getDrinksOption}>
          <View style={styles.centerify}>
            <Text style={this.state.drinksPressed ? styles.optionTextPressed : styles.optionText }>Drinks</Text>
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

  setTimer(type){
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
      console.log( type + " Count = " + count );
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
      foodInterval.push(typeInterval);
    }
    if( type == "random" ){
      randomInterval.push(typeInterval);
    }
    if( type == "drinks" ){
      drinksInterval.push(typeInterval);
    }
    if( type == "cafe" ){
      cafeInterval.push(typeInterval);
    }
  }

  resetTimer(type){
    if( type == "food" ){
      console.log( "Will clear interval for " + type );
      {this.clearIntervals(foodInterval)}
      foodInterval = [];
    }
    if( type == "random" ){
      console.log( "Will clear interval for " + type );
      {this.clearIntervals(randomInterval)}
      randomInterval = [];
    }
    if( type == "drinks" ){
      console.log( "Will clear interval for " + type );
      {this.clearIntervals(drinksInterval)}
      drinksInterval = [];
    }
    if( type == "cafe" ){
      console.log( "Will clear interval for " + type );
      {this.clearIntervals(cafeInterval)}
      cafeInterval = [];
    }
  }

  clearIntervals(intervalType){
    intervalType.forEach(function(interval) {
      console.log( "Clearing interval # " + interval );
      clearInterval( interval );
    });
  }

  showCached( type, venue ){
    this.props.retrieveVenue(type, venue,"2 mins before you can request again!");
  }

  async makeRequest(type, menuPrice, menuDistance) {
    var latitude  = this.getLatitude()
    var longitude = this.getLongitude()
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
      if( this.state.location && this.state.location.coords.latitude ){
        console.log( "Getting actual user latitude - " + this.state.location.coords.latitude );
        return this.state.location.coords.latitude;
      } else{
        console.log( "Getting fake user latitude - " + this.state.latitude );
        return this.state.latitude;
      }
    }

  getLongitude(){
    if( this.state.location && this.state.location.coords.longitude ){
      console.log( "Getting actual user longitude - " + this.state.location.coords.longitude );
      return this.state.location.coords.longitude;
    } else{
      console.log( "Getting fake user longitude - " + this.state.longitude );
      return this.state.longitude;
    }
  }
};

// Clears queried venues from back end server, which are cached in the FE
function clearCache(){
  console.log( "Cleared cache..." );
  cache = {};
}

// Resets counter of max calls allowed for food in 2 minute duration
function resetFoodCounter(){
  console.log( "Resetting food counter after timeout." );
  counters['food'] = 0;
  {that.props.resetMessage( "food" )}
}

// Resets counter of max calls allowed for cafe in 2 minute duration
function resetCafeCounter(){
  console.log( "Resetting cafe counter after timeout." );
  counters['cafe'] = 0;
  that.props.resetMessage( "cafe" );
}

// Resets counter of max calls allowed for drinks in 2 minute duration
function resetDrinksCounter(){
  console.log( "Resetting drinks counter after timeout." );
  counters['drinks'] = 0;
  that.props.resetMessage( "drinks" );
}

// Resets counter of max calls allowed for random in 2 minute duration
function resetRandomCounter(){
  console.log( "Resetting random counter after timeout." );
  counters['random'] = 0;
  that.props.resetMessage( "random" );
}

// Gets the venue  that needs to be displayed as a result
function getVenue( response, key ){
  var body = JSON.parse(response)._bodyInit;
  if( body.includes("Bad Gateway") ){
    console.log( "Unable to make request..." );
    return "Unable to access location data..."
  }
  var venues = JSON.parse(body);
  var venue = null;
  if( venues && venues.length > 0 ){
    console.log( "Storing " + key + " venues in cache..." );
    cache[key] = venues;
    venue = getOneVenue( venues );
  } else{
    console.log( "Unable to retrieve venues for this category" );
    return "No " +  key + " places found in this location "
  }
  return venue;
}

// Random venue selector from the list of venues retrieved
function getOneVenue( venues ){
  var item = Math.floor(Math.random()*venues.length);
  var venue = null;
  if ( venues[item] ){
    venue = venues[item].venue;
    console.log( "Choosing item # = " + item + ", value = " +  venue.name );
  }
  return venue;
}

// Makes call to backend with user parameters to display the venue required
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

//------------------------------ Styling --------------------------//

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
    fontFamily: font,
    textDecorationLine:'none'
  },
  optionTextPressed: {
    fontSize: 32,
    textAlign: 'center',
    fontFamily: font,
    textDecorationLine:'underline'
  },
  timerText:{
    fontSize: 20,
    fontFamily: font,
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
  waitForLocation:{
    flex: 1,
    backgroundColor: 'deepskyblue'
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
});

module.exports = Options;
