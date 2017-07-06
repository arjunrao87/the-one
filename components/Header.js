import React from 'react';
import {
  Platform,
  StyleSheet,
  PropTypes,
  Text,
  View,
} from 'react-native';
import Drawer from 'react-native-drawer'
import Menu from './Menu'
import Main from './Main'

class Header extends React.Component{
    state={
        drawerOpen: false,
        drawerDisabled: false,
        data : {distance:500,price:2}
      };
    closeDrawer = () => {
      this._drawer.close()
    };
    openDrawer = () => {
      this._drawer.open()
    };
    menuCallback = (data) => {
      this.setState( {data:data}  );
    }

    render() {
      return (
        <Drawer
          ref={(ref) => this._drawer = ref}
          type="static"
          content={
            <Menu closeDrawer={this.closeDrawer} passMenuOptions={this.menuCallback} />
          }
          acceptDoubleTap
          styles={{main: {shadowColor: '#000000', shadowOpacity: 0.3, shadowRadius: 15}}}
          onOpen={() => {
            console.log('onopen')
            this.setState({drawerOpen: true})
          }}
          onClose={() => {
            console.log('onclose')
            this.setState({drawerOpen: false})
          }}
          captureGestures={false}
          tweenDuration={100}
          panThreshold={0.08}
          disabled={this.state.drawerDisabled}
          openDrawerOffset={(viewport) => {
            return 100
          }}
          panOpenMask={0.2}
          negotiatePan
          >
          <Main menuOptions = {this.state.data} location={this.props.location}/>
        </Drawer>
      )
    }
}

const drawerStyles = {
  drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
}

const styles = StyleSheet.create({
  headerText: {
    fontSize: 30,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontFamily: 'Iowan Old Style',
  }
});

module.exports = Header;
