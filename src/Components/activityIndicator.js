import React from 'react';
import {ActivityIndicator, StyleSheet, Modal, View} from 'react-native';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';

class ActivityWaiter extends React.Component {
  render() {
    return (
      <Modal transparent={true} animationType={'fade'} visible={true}>
        <View style={style.modalBackground}>
          <View style={style.activityIndicatorWrapper}>
            <SkypeIndicator color="#e4264e" size={50} />
          </View>
        </View>
      </Modal>
    );
  }
}
const style = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#181f29',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#181f29',
    height: 100,
    padding: 20,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
export default ActivityWaiter;
