/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  AsyncStorage,
  ImageBackground,
  Text,
  TouchableOpacity,
} from 'react-native';
import {colorConstants, imageConstants} from '../config/constants';
import {connect} from 'react-redux';
import {
  signUpUser,
  loginUser,
  toggleSuccess,
} from '../Services/Authentication/action';

class notesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
    };
  }
  _logout = async () => {
    await AsyncStorage.clear();
    this.props.toggleSplash();
    this.props.navigation.navigate('LoginScreen');
  };
  _storeData = async () => {
    try {
      await AsyncStorage.setItem('token', JSON.stringify(this.props.token));
    } catch (error) {
      console.warn('error in saving async');
    }
  };
  componentDidMount() {
    this._storeData();
  }

  render() {
    const {navigation} = this.props;
    return <SafeAreaView style={styles.container} />;
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0d0d0d',
    flex: 1,
  },
});

const mapStateToProps = state => ({
  success: state.homeReducer.isSuccess,
  loading: state.homeReducer.isLoading,
  token: state.homeReducer.token,
});

const mapDispatchToProps = {
  loginUser: loginUser,
  toggleSucess: toggleSuccess,
  signUpUser: signUpUser,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(notesList);
