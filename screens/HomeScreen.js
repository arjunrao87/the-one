import React from 'react';
import {
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  SliderIOS,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
  Button,
  Alert,
  ListView,
} from 'react-native';

var requests = require('../requests/requests');

export default class HomeScreen extends React.Component {

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 6, backgroundColor: 'powderblue'}}>
          <View style={{flex: 1,backgroundColor: 'bisque'}}>
            <Text style={styles.headerText}>Decision Maker</Text>
          </View>
          <View style={{flex: 6,backgroundColor: 'aliceblue'}}>
            <Text></Text>
          </View>
        </View>
        <View style={{flex: 5}}>
          <TouchableHighlight underlayColor='chartreuse' style={{flex: 1, backgroundColor: 'plum'}} onPress={this.getCafeOption}>
            <Text style={styles.optionText}>Cafes</Text>
          </TouchableHighlight>
          <TouchableHighlight underlayColor='chartreuse' style={{flex: 1, backgroundColor: 'salmon'}}>
            <Text style={styles.optionText}>Random</Text>
          </TouchableHighlight>
          <TouchableHighlight underlayColor='chartreuse' style={{flex: 1, backgroundColor: 'dodgerblue'}}>
            <Text style={styles.optionText}>Food</Text>
          </TouchableHighlight>
          <TouchableHighlight underlayColor='chartreuse' style={{flex: 1, backgroundColor: 'deeppink'}}>
            <Text style={styles.optionText}>Drinks</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
  
  getFoodOption = () => {
    requests.getFoodOptionAsync(1,2,3);
  };
  getDrinksOption = () => {
    requests.getDrinksOptionAsync(1,2,3);
  };
  getCafeOption = () => {
    requests.getCafeOptionAsync(1,2,3);
  };
  getRandomOption = () => {
    requests.getRandomOptionAsync(1,2,3);
  };
}

const styles = StyleSheet.create({
  headerText: {
    fontSize: 30,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontFamily: 'Iowan Old Style',
  },
  optionText: {
    fontSize: 45,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontFamily: 'Iowan Old Style',
  },
  resultContainer: {
    flex: 2,
    backgroundColor: '#BBBBBB',
  },
  optionsContainer: {
    flex: 3,
    backgroundColor: '#000000',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 15,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 80,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 140,
    height: 38,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 23,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  slider: {
    height: 10,
    margin: 10,
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
    margin: 10,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
  },
});
