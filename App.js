import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import Header from './components/Header';
import {Permissions,Location,Constants} from 'expo';
import { Font } from 'expo';

var font = (Platform.OS === 'ios') ? "Iowan Old Style" : "space-mono"
var baseURL = //"http://localhost:8080/"
                "http://104.236.66.151:80/"

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
    this.loadFonts();
  }

  loadFonts = async() => {
    await Font.loadAsync({
      'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
    });
    this.setState({ isReady: true });
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    } else{
      console.log( "Permission to access location was granted");
    }
    //let location = await Location.getCurrentPositionAsync({});
    let {location} = await Location.watchPositionAsync({enableHighAccuracy:true, distanceInterval:20});
    this.setState({ location:location });
    {this.sendMetrics( location );}
  };

  venueCallback = (venue) => {
    this.setState({venue:venue});
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

  render() {
    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }
    return (
      <View style={{flex: 1}}>
        <Header location={this.state.location}/>
      </View>
    );
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
}

export {baseURL,font};
