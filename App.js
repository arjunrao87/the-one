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
var baseURL = "http://104.236.66.151:80/"

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.loadFonts();
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

export {baseURL,font};
