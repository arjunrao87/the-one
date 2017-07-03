import React from 'react';

import {
  PropTypes,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native'
var Slider = require('react-native-slider');

export default class Menu extends React.Component {

  constructor( props ){
    super( props );
    this.state = {value:2.0};
  }
  render() {
    return (
      <View style={{flex:1}}>
        <ScrollView style={{flex:1, backgroundColor:'cyan', padding:20}}>
          <Text>Filters</Text>
          <View>
            <Text>Distance</Text>
            <Text>Value: {this.state.value}</Text>
          </View>
          <View>
            <Text>Price</Text>
          </View>
          <View>
            <Text>Freeze for 30 mins</Text>
          </View>
          <Text>Help</Text>
          <Text>About</Text>
        </ScrollView>
        <View style={{flex:1}}>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
})
