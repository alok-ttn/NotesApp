/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import {colorConstants, imageConstants} from '../config/constants';
import {connect} from 'react-redux';
import {getNotes} from '../Services/Authentication/action';

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
  async componentDidMount() {
    this._storeData();
    // this.props.getNotes();
    console.warn(this.props.token);
  }

  render() {
    const {navigation} = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.headerView}>
          <Text style={[styles.headerTextView, {color: 'red'}]}> My</Text>
          <Text style={styles.headerTextView}> Notes</Text>
        </View>
        <View style={styles.flatlistView}>
          <Text>hello</Text>
        </View>
        <View style={styles.footerView}>
          <View style={styles.menuView}>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Image
                source={imageConstants.menuLight}
                style={styles.menuImage}
              />
              <Text style={styles.menuText}>Menu</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity>
            <Image source={imageConstants.add} style={styles.addButton} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  headerView: {
    flex: 0.2,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 30,
  },
  addButton: {
    height: 60,
    width: 60,
  },
  menuImage: {height: 40, width: 40},
  headerTextView: {
    fontSize: 40,
    fontWeight: 'bold',
    color: colorConstants.fontColourLight,
  },
  menuText: {
    fontSize: 10,
    color: 'red',
    marginLeft: 7,
    marginTop: 5,
  },
  menuView: {width: 80, justifyContent: 'center'},
  flatlistView: {
    flex: 0.7,
    backgroundColor: 'green',
    marginHorizontal: 30,
  },
  footerView: {
    marginHorizontal: 30,
    flex: 0.2,
    // backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

const mapStateToProps = state => ({
  success: state.homeReducer.isSuccess,
  loading: state.homeReducer.isLoading,
  token: state.homeReducer.token,
});

const mapDispatchToProps = {
  getNotes: getNotes,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(notesList);
