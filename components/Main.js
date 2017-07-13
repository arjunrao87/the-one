import React from 'react';

import {
  PropTypes,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import Results from './Results';
import Options from './Options';

export default class ControlPanel extends React.Component {

  constructor(props){
    super( props );
    this.state = {
      active:false,
      isMenuOpen:false
    }
  }

  venueCallback = (type, venue, message) => {
    this.setState({type:type, venue:venue, message:message});
  }

  resetMsg = ( type ) => {
    this.setState({resetType:type});
  }

  static contextTypes = {
    drawer: React.PropTypes.object.isRequired,
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 6}}>
          <Results type={this.state.type} venue={this.state.venue} message={this.state.message} resetType={this.state.resetType}/>
        </View>
        <View style={{flex: 5}}>
          <Options menuOptions={this.props.menuOptions} retrieveVenue={this.venueCallback} resetMessage={this.resetMsg} location={this.props.location}/>
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
