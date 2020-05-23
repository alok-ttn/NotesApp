import React from 'react';
import {View, Image, StyleSheet, AsyncStorage} from 'react-native';
import {connect} from 'react-redux';
import {toggleSplash} from '../Services/Authentication/action';
import {colorConstants, imageConstants} from '../config/constants';

class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flag: false,
    };
  }
  onChangeText(input) {}
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.innerview}>
          <Image source={imageConstants.splashLogo} style={styles.LogoStyle} />
        </View>
      </View>
    );
  }
  _logout = async () => {
    await AsyncStorage.clear();
    this.props.toggleSplash();
    this.props.navigation.navigate('LoginScreen');
  };
  _retrieveData = async () => {
    const {navigation} = this.props;
    try {
      const value = await AsyncStorage.getItem('token');
      console.log(value);
      if (value !== null) {
        this.props.toggleSplash();
        setTimeout(() => {
          navigation.reset({
            index: 0,
            routes: [{name: 'notesList'}],
          });
        }, 500);
      }
      if (value === null) {
        setTimeout(() => {
          navigation.reset({
            index: 0,
            routes: [{name: 'LoginScreen'}],
          });
        }, 500);
      }
    } catch (error) {
      console.warn('no data');
      // Error retrieving data
    }
  };
  componentDidMount() {
    this._retrieveData();
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorConstants.bacgroundColorSplash,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerview: {
    height: 100,
    width: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  LogoStyle: {
    height: 40.5,
    width: 200.5,
    resizeMode: 'contain',
  },
});
const mapStateToProps = state => ({
  token: state.homeReducer.token,
});

const mapDispatchToProps = {
  toggleSplash: toggleSplash,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Splash);
