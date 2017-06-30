import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { MapView } from 'react-native';

class Results extends React.Component{

  constructor(props) {
    super(props);
  }

  render(){
    let content = null;
    var name = null;
    var category = null;
    var addressText = null;
    var showMap = null;
    if(  this.props.venue ){
      console.log( JSON.stringify(this.props.venue) );
      var venueVal = JSON.stringify(this.props.venue);
      name = JSON.parse( venueVal ).name;
      category = JSON.parse( venueVal ).categories[0].name;
      addressText = JSON.parse( venueVal ).location.address
                  + ", "
                  + JSON.parse( venueVal ).location.city ;
      showMap =
      <MapView
        style={styles.mapView}
        region={{
          latitude: 39.06,
          longitude: -95.22,
        }}
      />;
    }
    return(
      <View style={{flex: 6,backgroundColor: 'aliceblue'}}>
        <Text numberOfLines={1} minimumFontScale={0.9} adjustsFontSizeToFit style = {styles.resultHeaderText}>{name}</Text>
        <Text numberOfLines={1} minimumFontScale={0.9} adjustsFontSizeToFit style = {styles.resultSubHeaderText}>{addressText}</Text>
        <View>{showMap}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  resultHeaderText:{
    fontSize: 40,
    textAlign: 'center',
    fontFamily: 'Iowan Old Style',
    marginTop: 60,
  },
  resultCategoryText:{
    fontSize: 15,
    textAlign: 'center',
    fontFamily: 'Iowan Old Style',
    marginTop: 20,
  },
  resultSubHeaderText:{
    fontSize: 25,
    textAlign: 'center',
    fontFamily: 'Iowan Old Style',
    marginTop: 40,
  },
  mapView:{
    height: 120,
    margin: 40,
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
