import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';

class Header extends React.Component{

  render(){
    return(
      <View style={{flex: 1,backgroundColor: 'bisque'}}>
        <Text style={styles.headerText}>Decision Maker</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerText: {
    fontSize: 30,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontFamily: 'Iowan Old Style',
  }
});

module.exports = Header;
