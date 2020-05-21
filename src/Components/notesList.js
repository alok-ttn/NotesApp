/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
} from 'react-native';
import {colorConstants, imageConstants} from '../config/constants';
import {fetchVideosApi} from '../Services/Authentication/action';
import imageUrl from '../config/env';

class notesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
    };
  }
  componentDidMount() {
    // console.log(this.props.videosData.results);
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

export default notesList;
