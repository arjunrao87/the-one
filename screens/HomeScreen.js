import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

import Header from './Header';
import Results from './Results';
import Options from './Options';

export default class HomeScreen extends React.Component {

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 6, backgroundColor: 'powderblue'}}>
          <Header/>
          <Results/>
        </View>
        <View style={{flex: 5}}>
          <Options/>
        </View>
      </View>
    );
  }
}
