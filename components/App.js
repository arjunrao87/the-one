import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

import Header from './Header';
import Results from './Results';
import Options from './Options';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  venueCallback = (venue) => {
    this.setState({venue:venue});
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 6, backgroundColor: 'powderblue'}}>
          <Header/>
          <Results venue={this.state.venue}/>
        </View>
        <View style={{flex: 5}}>
          <Options retrieveVenue={this.venueCallback}/>
        </View>
      </View>
    );
  }
}
