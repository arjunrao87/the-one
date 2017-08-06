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
import {
  Analytics,
  Hits as GAHits,
  Experiment as GAExperiment
} from 'react-native-google-analytics';

var font = (Platform.OS === 'ios') ? "Iowan Old Style" : "space-mono"
var baseURL = "http://104.236.66.151:80/"
const appVersion = "2.0.0";
var clientId;

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.loadFonts();
    clientId = Math.random(0,100000);
  }

  loadFonts = async() => {
    await Font.loadAsync({
      'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }
    return (
      <View style={{flex: 1}}>
        <Header/>
      </View>
    );
  }
}

exports.sendGoogleAnalytics = function( page ){
  ga = new Analytics('UA-103808681-1', clientId, 1, "fakeDeviceAgent");
  var screenView = new GAHits.ScreenView(
    'The One',
    page,
    appVersion
  );
  ga.send(screenView);
}

export {baseURL,font};
