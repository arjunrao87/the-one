import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Linking,
} from 'react-native';

class Results extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      ratingColor :  'aliceblue',
      rating : "0"
    };
  }

  render(){
    let content = null;
    var name = null;
    var category = null;
    var address = null;
    var showMap = null;
    var latitude = null;
    var longitude = null;
    var price = null;
    var rating = null;
    if(  this.props.venue ){
      console.log( JSON.stringify(this.props.venue) );
      var venueVal = JSON.stringify(this.props.venue);
      name = JSON.parse( venueVal ).name;
      category = JSON.parse( venueVal ).categories[0].name;
      address = JSON.parse( venueVal ).location.address
                  + ", "
                  + JSON.parse( venueVal ).location.city ;
      latitude = JSON.parse( venueVal ).location.lat;
      longitude = JSON.parse( venueVal ).location.lng;
      rating = JSON.parse( venueVal ).rating;
      var tier = JSON.parse( venueVal ).price.tier;
      if( tier == 1 ){
        price = "$";
      } else if( tier == 2 ){
        price = "$$";
      } else if( tier == 3 ){
        price = "$$$";
      } else if( tier == 4 ){
        price = "$$$$";
      }
    }

    return(
      <View style={this.getContainerStyle(rating)}>
        <Text numberOfLines={1} minimumFontScale={0.9} adjustsFontSizeToFit style = {styles.name}>{name}</Text>
        <Text numberOfLines={1} minimumFontScale={0.9} adjustsFontSizeToFit style = {styles.category}>{category}</Text>
        <Text numberOfLines={1} onPress={() => this.openInAppleMaps(latitude, longitude)} minimumFontScale={0.9} adjustsFontSizeToFit style = {styles.address}>{address}</Text>
        <Text numberOfLines={1} minimumFontScale={0.9} adjustsFontSizeToFit style = {styles.price}>{price}</Text>
        <Text numberOfLines={1} minimumFontScale={0.9} adjustsFontSizeToFit style = {styles.rating}>{rating}</Text>
      </View>
    );
  }

  getContainerStyle(rating){
    var containerStyle =  null;
    console.log( "Rating = " + rating );
    if( rating == null ){
      containerStyle = {
          flex: 6,
          backgroundColor: 'aliceblue',
          alignItems:'center'
        }
    } else if( rating < 7 ){
      containerStyle = {
          flex: 6,
          backgroundColor: 'lightsalmon',
          alignItems:'center'
        }
    } else if( rating < 9 ){
      containerStyle = {
          flex: 6,
          backgroundColor: 'lemonchiffon',
          alignItems:'center'
        }
    } else {
      containerStyle = {
          flex: 6,
          backgroundColor: 'mediumspringgreen',
          alignItems:'center'
        }
    }
    return containerStyle;
  }

  openInAppleMaps(latitude,longitude){
    if ( latitude && longitude ){
      console.log( "Opening address with "+ latitude + "," + longitude);
      Linking.openURL("http://maps.apple.com/?daddr="+latitude+","+longitude);
    }
  }
}

const styles = StyleSheet.create({
  name:{
    fontSize: 40,
    textAlign: 'center',
    fontFamily: 'Iowan Old Style',
    alignItems : 'center',
    marginTop:110
  },
  category:{
    fontSize: 15,
    textAlign: 'center',
    fontFamily: 'Iowan Old Style',
    marginTop: 10,
  },
  address:{
    fontSize: 25,
    textAlign: 'center',
    fontFamily: 'Iowan Old Style',
    marginTop: 10,
    textDecorationLine:'underline'
  },
  rating:{
    fontSize: 25,
    textAlign: 'center',
    fontFamily: 'Iowan Old Style',
    marginTop: 10,
  },
  price:{
    fontSize: 25,
    textAlign: 'center',
    fontFamily: 'Iowan Old Style',
    marginTop: 20,
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
