import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

var requests = require('../requests/requests');

class Options extends React.Component {
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
  optionText: {
    fontSize: 45,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontFamily: 'Iowan Old Style',
  },
});

module.exports = Options;
