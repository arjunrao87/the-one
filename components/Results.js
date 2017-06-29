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
  }

  render(){
    let content = null;
    var name = null;
    if(  this.props.venue ){
      name = JSON.parse( JSON.stringify(this.props.venue) ).name;
    }
    return(
      <View style={{flex: 6,backgroundColor: 'aliceblue'}}>
        <Text style = {styles.resultText}>{name}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  resultText:{
    fontSize: 40,
    textAlign: 'center',
    fontFamily: 'Iowan Old Style',
    marginTop: 150,
  },
  optionText: {
    fontSize: 45,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontFamily: 'Iowan Old Style',
  },
});

module.exports = Results;
