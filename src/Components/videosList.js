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
import {connect} from 'react-redux';
import {fetchVideosApi} from '../Services/Authentication/action';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import imageUrl from '../config/env';

class VideoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
    };
  }
  componentDidMount() {
    // console.log(this.props.videosData.results);
  }

  get pagination() {
    const {activeSlide} = this.state;
    return (
      <Pagination
        dotsLength={4}
        activeDotIndex={activeSlide}
        containerStyle={{backgroundColor: 'rgba(0, 0, 0, 0.75)'}}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.92)',
        }}
        inactiveDotStyle={
          {
            // Define styles for inactive dots here
          }
        }
        inactiveDotOpacity={0.5}
        activeOpacity={1}
        inactiveDotColor={colorConstants.otherTextColor}
        inactiveDotScale={1}
      />
    );
  }
  _renderItem({item, index}) {
    var imageurl = imageUrl.baseURL + item.backdrop_path;
    return (
      <View style={styles.bannerItemsView}>
        <Image source={{uri: imageurl}} style={styles.bannerImage} />
      </View>
    );
  }
  render() {
    const {navigation} = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={imageConstants.backgroundImage}
          style={styles.imageBack}>
          <View style={styles.topBarView}>
            <View style={styles.topBarLeft}>
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <Image source={imageConstants.drawer} style={styles.titleBar} />
              </TouchableOpacity>
              <Text style={styles.applogoText}>APP LOGO</Text>
            </View>
            <View style={styles.topBarRight}>
              <TouchableOpacity>
                <Image
                  source={imageConstants.notification}
                  style={styles.titleBar}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image source={imageConstants.search} style={styles.titleBar} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.bannerView}>
            <Carousel
              layout={'default'}
              ref={ref => (this.carousel = ref)}
              data={this.props.videosData.results}
              sliderWidth={450}
              itemWidth={450}
              renderItem={this._renderItem}
              inactiveSlideOpacity={0.7}
              inactiveSlideScale={1}
              onSnapToItem={index => this.setState({activeIndex: index})}
            />
            {this.pagination}
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0d0d0d',
    flex: 1,
  },
  bannerImage: {height: 200, width: 500, resizeMode: 'center'},
  imageBack: {
    flex: 1,
    resizeMode: 'center',
  },
  bannerView: {
    flex: 0.3,
  },
  bannerItemsView: {
    borderRadius: 5,
    height: 200,
    marginLeft: 15,
    marginRight: 10,
  },
  applogoText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 20,
  },
  titleBar: {height: 30, width: 30, marginRight: 20},
  topBarLeft: {
    flex: 0.5,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  topBarRight: {
    flex: 0.5,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 8,
  },
  topBarView: {
    flex: 0.06,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 15,
  },
});

const mapStateToProps = state => ({
  isLoggedIn: state.homeReducer.isLoggedIn,
  videosData: state.homeReducer.videosData,
});

const mapDispatchToProps = {
  fetchVideosApi: fetchVideosApi,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(VideoList);
