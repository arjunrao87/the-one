import React from 'react';

import {
  PropTypes,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  Slider,
  View,
} from 'react-native'

export default class Menu extends React.Component {

  constructor( props ){
    super( props );
    this.state = {distance:500,price:2, priceRating:'$$'};
  }
  render() {
    return (
      <View style={{flex:1}}>
        <View style={{flex:1, backgroundColor:'ivory', padding:20}}>
          <View style={styles.distance} >
            <Text style={styles.menuText}>Distance - {this.state.distance} m</Text>
              <Slider
               value={this.state.distance}
               value= {500}
               maximumValue={5000}
               minimumValue={0}
               onSlidingComplete={(value) => {
                 console.log( "Finish Value = " + value);
                 this.setState({distance:parseInt(value)})}
                  }/>
          </View>
          <View style={styles.distance} >
            <Text style={styles.menuText}>Price  - {this.state.priceRating} </Text>
              <Slider
               value={this.state.price}
               maximumValue={4}
               minimumValue={1}
               step={1}
               onSlidingComplete={(value) => {
                 console.log( "Finish Value = " + value);
                 this.setState({price:parseInt(value)})
                 if( value == 1 ){
                   this.setState( {priceRating:'$'});
                 } else if ( value == 2 ){
                   this.setState( {priceRating:'$$'});
                 } else if ( value == 3 ){
                   this.setState( {priceRating:'$$$'});
                 } else if ( value == 4 ){
                   this.setState( {priceRating:'$$$$'});
                 }
                }
              }/>
          </View>
          <TouchableHighlight style={{flex:1}} >
            <Text style={styles.menuText}>About</Text>
          </TouchableHighlight>
        </View>
        <View style={{flex:1, backgroundColor:'ivory'}}>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 40,
  },
  menuText:{
    fontSize: 20,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontFamily:'Avenir'
  },
  distance: {
    flex: 1,
    marginLeft: 10,
    marginRight: 40,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
})
