import React from 'react';

import {
  PropTypes,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import Hamburger from 'react-native-hamburger';
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

  venueCallback = (venue) => {
    this.setState({venue:venue});
  }

  static contextTypes = {
    drawer: React.PropTypes.object.isRequired,
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 6}}>
          <Results venue={this.state.venue}/>
        </View>
        <View style={{flex: 5}}>
          <Options menuOptions={this.props.menuOptions} retrieveVenue={this.venueCallback}/>
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
