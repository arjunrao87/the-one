import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import Results from './Results';
import Options from './Options';
import PropTypes from 'prop-types';

export default class ControlPanel extends React.Component {

  constructor(props){
    super( props );
    this.state = {
      active:false,
      isMenuOpen:false
    }
  }

  venueCallback = (type, venue, message) => {
    console.log( "Received " + message + " for type = " + type + ", venue = " + venue );
    this.setState({type:type, venue:venue, message:message});
  }

  resetMsg = ( type ) => {
    this.setState({resetType:type});
  }

  static contextTypes = {
    drawer: PropTypes.object.isRequired,
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 6}}>
          <Results type={this.state.type} venue={this.state.venue} message={this.state.message} resetType={this.state.resetType}/>
        </View>
        <View style={{flex: 5}}>
          <Options menuOptions={this.props.menuOptions} retrieveVenue={this.venueCallback} resetMessage={this.resetMsg}/>
        </View>
      </View>
    )
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
}
