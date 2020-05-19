import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from 'react-native';
const Realm = require('realm');
import {colorConstants, imageConstants} from '../config/constants';
import {connect} from 'react-redux';
import {
  toggleLogin,
  toggleSuccess,
  fetchVideosApi,
} from '../Services/Authentication/action';
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      realm: null,
    };
  }
  onChangeText(input) {}
  render() {
    const {username, password, realm} = this.state;
    return (
      <View style={styles.container}>
        <ImageBackground
          source={imageConstants.backgroundImage}
          style={styles.imageBack}>
          <View style={styles.LogoView}>
            <View style={styles.logoImageView}>
              <Image source={imageConstants.logo} style={styles.LogoStyle} />
            </View>
            <View style={styles.appNameView}>
              <Text style={styles.appNameText}>APP NAME</Text>
            </View>
          </View>

          <View style={styles.loginSignUpView}>
            <View style={styles.loginView}>
              <TouchableOpacity>
                <Text style={styles.loginTextView}>Login</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.signUpview}>
              <TouchableOpacity>
                <Text style={styles.signUpText}>Sign up</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.noteToUser}>
            {' '}
            Please login to access your account.
          </Text>

          <View style={styles.InputTextView}>
            <View style={styles.usernameView}>
              <View style={styles.iconsView}>
                <Image
                  source={imageConstants.userIcon}
                  style={styles.iconImageView}
                />
              </View>
              <View style={styles.PlaceholderView}>
                <TextInput
                  style={styles.inputDetails}
                  placeholder={'User Name'}
                  placeholderTextColor={colorConstants.otherTextColor}
                  autoCapitalize={false}
                  color={'#fff'}
                  fontSize={17}
                  onChangeText={text => {
                    this.setState({username: text});
                  }}
                />
              </View>
            </View>

            <View style={styles.usernameView}>
              <View style={styles.iconsView}>
                <Image
                  source={imageConstants.passwordIcon}
                  style={styles.iconImageView}
                />
              </View>
              <View style={styles.PlaceholderView}>
                <TextInput
                  style={styles.inputDetails}
                  placeholder={'Password'}
                  placeholderTextColor={colorConstants.otherTextColor}
                  secureTextEntry={true}
                  color={'#fff'}
                  fontSize={16}
                  autoCapitalize={false}
                  onChangeText={text => {
                    this.setState({password: text});
                  }}
                />
              </View>
            </View>
          </View>
          <View style={styles.LowerSection}>
            <TouchableOpacity
              onPress={() => {
                this.props.toggleLogin(
                  realm.objects('UserData'),
                  username,
                  password,
                );
                // navigation.navigate('videolist');
              }}>
              <View style={styles.loginButton}>
                <Text style={styles.loginText}>LOGIN</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }

  saveData() {
    const {realm} = this.state;
    realm.write(() => {
      realm.create('UserData', {username: 'Admin', password: 'Admin'});
    });
  }

  deleteData() {
    const {realm} = this.state;
    realm.write(() => {
      let user = realm.objects('UserData');
      realm.delete(user);
    });
  }

  componentDidMount() {
    Realm.open({
      schema: [
        {
          name: 'UserData',
          properties: {username: 'string', password: 'string'},
        },
      ],
    }).then(realm => {
      this.setState({realm});
      this.deleteData();
      this.saveData();
    });
  }

  componentWillUnmount() {
    const {realm} = this.state;
    if (realm !== null && !realm.isClosed) {
      realm.close();
    }
  }

  static getDerivedStateFromProps(props, state) {
    const {navigation} = props;
    if (props.isLoggedIn === 1) {
      props.fetchVideosApi();
      setTimeout(() => {
        navigation.reset({
          index: 0,
          routes: [{name: 'videolist'}],
        });
      }, 500);
    }

    if (props.isLoggedIn === 2) {
      Alert.alert('Error', 'Wrong Login Credentials', [
        {
          text: 'Try Again',
          onPress: () => props.toggleSuccess(),
        },
      ]);
    }
    return null;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconsView: {
    flex: 0.15,
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  PlaceholderView: {
    justifyContent: 'center',
    flexWrap: 'wrap',
    flex: 0.8,
  },
  iconImageView: {height: 40, width: 40},
  noteToUser: {
    fontSize: 17,
    color: colorConstants.otherTextColor,
    marginTop: 15,
    textAlign: 'center',
  },
  loginSignUpView: {flex: 0.05, marginTop: 50, flexDirection: 'row'},
  loginView: {
    flex: 0.5,
    borderRightWidth: 1.5,
    borderRightColor: colorConstants.otherTextColor,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  loginTextView: {
    color: colorConstants.fontColour,
    marginRight: 20,
    fontSize: 30,
    fontWeight: '700',
  },
  appNameView: {flex: 0.2, justifyContent: 'flex-end', alignItems: 'center'},
  appNameText: {fontSize: 24, color: '#fff', fontWeight: '800'},
  logoImageView: {flex: 1, justifyContent: 'flex-end', alignItems: 'center'},
  InputTextView: {
    flex: 0.3,
    marginTop: 27,
  },
  imageBack: {
    flex: 1,
    resizeMode: 'center',
  },
  LowerSection: {
    flex: 0.25,
  },
  newUserSignUp: {
    flexDirection: 'row',
    marginVertical: 17,
    marginHorizontal: 15,
    justifyContent: 'center',
  },
  LogoView: {
    flex: 0.25,
  },
  forgotPassword: {
    alignSelf: 'center',
    fontSize: 16,
    color: colorConstants.otherTextColor,
    marginTop: 14,
    marginBottom: 20,
    fontWeight: '500',
  },
  newUserText: {
    fontSize: 15,
    color: colorConstants.forgotPasswordTextColor,
    alignSelf: 'flex-end',
    fontWeight: '300',
  },
  loginButton: {
    borderRadius: 4,
    height: 50,
    backgroundColor: colorConstants.fontColour,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 10,
    marginHorizontal: 20,
  },
  LogoStyle: {
    resizeMode: 'contain',
  },
  usernameView: {
    backgroundColor: '#181f28',
    marginHorizontal: 20,
    marginTop: 30,
    flex: 0.3,
    flexDirection: 'row',
    borderRadius: 6,
  },
  loginText: {
    color: '#fff',
    fontSize: 16,
    paddingVertical: 13,
  },
  signUpview: {flex: 0.5, justifyContent: 'center'},
  signUpText: {fontSize: 25, marginLeft: 20, color: '#fff', fontWeight: '400'},
});

const mapStateToProps = state => ({
  isLoggedIn: state.homeReducer.isLoggedin,
});

const mapDispatchToProps = {
  toggleLogin: toggleLogin,
  toggleSuccess: toggleSuccess,
  fetchVideosApi: fetchVideosApi,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
