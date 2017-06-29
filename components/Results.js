import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

class Results extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      bodyText: "Choose your option...",
    };
  }

  render(){
    return(
      <View style={{flex: 6,backgroundColor: 'aliceblue'}}>
        <Text>{this.state.bodyText}</Text>
      </View>
    );
  }
}

module.exports = Results;
