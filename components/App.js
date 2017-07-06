import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import Header from './Header';
import {Permissions,Location} from 'expo';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    } else{
      console.log( "Permission to access location was granted");
    }
    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location:location });
  };

  venueCallback = (venue) => {
    this.setState({venue:venue});
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Header location={this.state.location}/>
      </View>
    );
  }
}
