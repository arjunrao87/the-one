import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  View,
  WebView,
  Linking,
  Image
} from 'react-native';
import Modal from 'react-native-modalbox';
import Hamburger from './Hamburger';
import * as Progress from 'react-native-progress';

var messages = {'food':'', 'cafe' :'', 'drinks': '', 'random':''}

class Results extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      ratingColor :  'aliceblue',
      rating : "0",
      active:false,
      isMenuOpen:false,
    };
  }

  venueCallback = (venue) => {
    this.setState({venue:venue});
  }

  static contextTypes = {
    drawer: React.PropTypes.object.isRequired,
  };

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
    var progressBar = null;
    var message = null;
    var url = 'https://www.google.com/maps?daddr=';

    if( this.props.resetType ){
      var typeToReset = this.props.resetType;
      messages[typeToReset] = '';
      message = messages[typeToReset];
    }
    if(  this.props.venue ){
      var venueVal = JSON.stringify(this.props.venue);
      name = JSON.parse( venueVal ).name;
      category = JSON.parse( venueVal ).categories[0].name;
      address = JSON.parse( venueVal ).location.address
                  + ", "
                  + JSON.parse( venueVal ).location.city ;
      latitude = JSON.parse( venueVal ).location.lat;
      longitude = JSON.parse( venueVal ).location.lng;
      url = url +latitude+","+longitude
      messages[this.props.type] = this.props.message;
      if( this.props.resetType === undefined || this.props.type !=this.props.resetType){
        message = messages[this.props.type];
      }
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
        <View style={{paddingTop:20, paddingLeft:20, flex:1}}>
          <Hamburger active={this.state.active} onPress={this.trigger.bind(this)} />
        </View>
        <View style={{flex:9}}>
          <View style={{flex:8}}>
            <Text numberOfLines={1} minimumFontScale={0.9} adjustsFontSizeToFit style = {styles.name}>{name}</Text>
            <Text numberOfLines={1} minimumFontScale={0.9} adjustsFontSizeToFit style = {styles.category}>{category}</Text>
            <Text numberOfLines={1} onPress={() => this.openInMaps(latitude,longitude)} minimumFontScale={0.9} adjustsFontSizeToFit style = {styles.address}>{address}</Text>
            <Text numberOfLines={1} minimumFontScale={0.9} adjustsFontSizeToFit style = {styles.price}>{price}</Text>
            <Text numberOfLines={1} minimumFontScale={0.9} adjustsFontSizeToFit style = {styles.rating}>{rating}</Text>
          </View>
          <View style={{flex:1.25,alignItems:'center'}}>
            <Text>{message}</Text>
          </View>
        </View>
      </View>
    );
  }

  trigger(){
    if( this.state.isMenuOpen ){
      this.context.drawer.close();
      this.setState({isMenuOpen:false});
    } else {
      this.context.drawer.open();
      this.setState({isMenuOpen:true});
    }
    this.setState( {active:!this.state.active});
  }

  getContainerStyle(rating){
    var containerStyle =  null;
    console.log( "Rating = " + rating );
    if( rating == null ){
      containerStyle = {
          backgroundColor: 'aliceblue',
          flex :1
        }
    } else if( rating < 7 ){
      containerStyle = {
          backgroundColor: 'lightsalmon',
          flex :1
        }
    } else if( rating < 9 ){
      containerStyle = {
          backgroundColor: 'lemonchiffon',
          flex :1
        }
    } else {
      containerStyle = {
          backgroundColor: 'mediumspringgreen',
          flex :1
        }
    }
    return containerStyle;
  }

  openInMaps(latitude,longitude){
    if ( latitude && longitude ){
      console.log( "Opening address with "+ latitude + "," + longitude);
      Linking.openURL("https://www.google.com/maps?daddr="+latitude+","+longitude);
    }
  }
}

const styles = StyleSheet.create({
  name:{
    fontSize: 30,
    textAlign: 'center',
    fontFamily: 'Iowan Old Style',
    alignItems : 'center',
    marginTop:20
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
  mapModal:{
    height: 500,
    width: 500,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    backgroundColor:'cornsilk'
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
