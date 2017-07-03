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

export default class ControlPanel extends React.Component {

  constructor(props){
    super( props );
    this.state = {
      active:false,
      isMenuOpen:false
    }
  }

  static contextTypes = {
    drawer: React.PropTypes.object.isRequired,
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <TouchableOpacity>
          <Hamburger active={this.state.active} type="cross" onPress={this.trigger.bind(this)} />
        </TouchableOpacity>
      </ScrollView>
    )
  }

  trigger(){
    if( this.state.isMenuOpen ){
      this.context.drawer.close();
      this.setState({isMenuOpen:false});
    } else{
      this.context.drawer.open();
      this.setState({isMenuOpen:true});
    }
    this.setState( {active:!this.state.active});
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
})
