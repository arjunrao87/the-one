import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

var requests = require('../requests/requests');

export default class HomeScreen extends React.Component {

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 6, backgroundColor: 'powderblue'}}>
          <View style={{flex: 1,backgroundColor: 'bisque'}}>
            <Text style={styles.headerText}>Decision Maker</Text>
          </View>
          <View style={{flex: 6,backgroundColor: 'aliceblue'}}>
            <Text></Text>
          </View>
        </View>
        <View style={{flex: 5}}>
          <TouchableHighlight underlayColor='chartreuse' style={{flex: 1, backgroundColor: 'plum'}} onPress={this.getCafeOption}>
            <Text style={styles.optionText}>Cafes</Text>
          </TouchableHighlight>
          <TouchableHighlight underlayColor='chartreuse' style={{flex: 1, backgroundColor: 'salmon'}}>
            <Text style={styles.optionText}>Random</Text>
          </TouchableHighlight>
          <TouchableHighlight underlayColor='chartreuse' style={{flex: 1, backgroundColor: 'dodgerblue'}}>
            <Text style={styles.optionText}>Food</Text>
          </TouchableHighlight>
          <TouchableHighlight underlayColor='chartreuse' style={{flex: 1, backgroundColor: 'deeppink'}}>
            <Text style={styles.optionText}>Drinks</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  getFoodOption = () => {
    requests.getFoodOptionAsync(1,2,3);
  };
  getDrinksOption = () => {
    requests.getDrinksOptionAsync(1,2,3);
  };
  getCafeOption = () => {
    requests.getCafeOptionAsync(1,2,3);
  };
  getRandomOption = () => {
    requests.getRandomOptionAsync(1,2,3);
  };
}

const styles = StyleSheet.create({
  headerText: {
    fontSize: 30,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontFamily: 'Iowan Old Style',
  },
  optionText: {
    fontSize: 45,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontFamily: 'Iowan Old Style',
  },
});
