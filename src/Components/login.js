import React from 'react';
import {
  View,
  SafeAreaView,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {colorConstants, imageConstants} from '../config/constants';
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleHeader: 0,
      username: '',
      usernameValidate: true,
      password: '',
      passwordValidate: true,
      email: '',
      emailValidate: true,
      secureTextEntryValue: true,
      matchPassword: true,
    };
  }
  validate(text, type) {
    var userNameRegex = /^\S{4,}$/;
    var passwordRegex = /^[a-zA-Z0-9!@#$%^&*]{6}$/;
    var emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    if (type === 'username') {
      if (userNameRegex.test(text)) {
        this.setState({usernameValidate: true});
        this.setState({username: text});
      } else {
        this.setState({usernameValidate: false});
      }
    } else if (type === 'password') {
      if (passwordRegex.test(text)) {
        this.setState({passwordValidate: true});
        this.setState({password: text});
      } else {
        this.setState({passwordValidate: false});
      }
    } else if (type === 'email') {
      if (emailRegex.test(text)) {
        this.setState({emailValidate: true});
        this.setState({email: text});
      } else {
        this.setState({emailValidate: false});
      }
    }
  }
  matchPassword(text) {
    if (text === this.state.password) {
      this.setState({matchPassword: true});
    } else {
      this.setState({matchPassword: false});
    }
  }
  animate = () => {
    this.setState({toggleHeader: this.state.toggleHeader === 0 ? 1 : 0});
  };
  toggleSecureTextInput() {
    this.setState({secureTextEntryValue: !this.state.secureTextEntryValue});
  }
  onChangeText(input) {}
  render() {
    const {
      secureTextEntryValue,
      username,
      password,
      toggleHeader,
      usernameValidate,
      matchPassword,
      passwordValidate,
      emailValidate,
    } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.headerView}>
          <View style={styles.headerLeftView}>
            {toggleHeader === 0 ? (
              <Text style={styles.headerLeftText}>Login</Text>
            ) : (
              <Text style={styles.headerLeftText}>Sign Up</Text>
            )}
          </View>
          <View style={styles.headerRightView}>
            <TouchableOpacity onPress={() => this.animate()}>
              {toggleHeader === 0 ? (
                <Text style={styles.headerRightText}>Sign Up</Text>
              ) : (
                <Text style={styles.headerRightText}>Login</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
        {toggleHeader === 0 ? (
          <View style={styles.bottomView}>
            <View style={styles.bottomIconView}>
              <View style={styles.iconImageView}>
                <Image
                  source={imageConstants.userIcon}
                  style={styles.imageIcon}
                />
              </View>
            </View>
            <View style={styles.textInputFieldsView}>
              <View
                style={
                  usernameValidate
                    ? styles.textInputBoxView
                    : styles.textInputBoxViewError
                }>
                <TextInput
                  style={styles.textInputTextView}
                  placeholder={'Username or email address'}
                  placeholderTextColor={'#7d7d7d'}
                  onChangeText={text => {
                    this.validate(text, 'username');
                  }}
                />
              </View>
              <View
                style={
                  passwordValidate
                    ? styles.textInputBoxView
                    : styles.textInputBoxViewError
                }>
                <View style={styles.passwordBoxInput}>
                  <TextInput
                    style={styles.textInputTextView}
                    placeholder={'Password'}
                    placeholderTextColor={'#7d7d7d'}
                    secureTextEntry={secureTextEntryValue}
                    onChangeText={text => {
                      this.validate(text, 'password');
                    }}
                  />
                </View>
                <View style={styles.eyeImageView}>
                  <TouchableOpacity
                    onPress={() => this.toggleSecureTextInput()}>
                    <Image source={imageConstants.eye} />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.wheelIconView}>
                <TouchableOpacity>
                  <Image source={imageConstants.wheel} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.buttonFlexView}>
              <TouchableOpacity style={styles.loginButtonView}>
                <View style={styles.loginView}>
                  <Image
                    source={imageConstants.tick}
                    style={styles.tickImageView}
                  />
                  <Text style={styles.loginTextView}>LOG IN</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.loginWithView}>
              <Text style={styles.loginWithText}>Login with</Text>
            </View>
            <View style={styles.LoginWithIconsView}>
              <TouchableOpacity>
                <Image source={imageConstants.googlePlus} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image source={imageConstants.github} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image source={imageConstants.twitter} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image source={imageConstants.facebook} />
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.bottomView}>
            <View style={styles.bottomIconView}>
              <View style={styles.iconImageView}>
                <TouchableOpacity>
                  <Image
                    source={imageConstants.camera}
                    style={styles.imageIcon}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.textInputFieldsView}>
              <View
                style={
                  emailValidate
                    ? styles.textInputBoxView
                    : styles.textInputBoxViewError
                }>
                <TextInput
                  style={styles.textInputTextView}
                  placeholder={'Email address'}
                  placeholderTextColor={'#7d7d7d'}
                  onChangeText={text => {
                    this.validate(text, 'email');
                  }}
                />
              </View>
              <View
                style={
                  usernameValidate
                    ? styles.textInputBoxView
                    : styles.textInputBoxViewError
                }>
                <TextInput
                  style={styles.textInputTextView}
                  placeholder={'Username'}
                  placeholderTextColor={'#7d7d7d'}
                  onChangeText={text => {
                    this.validate(text, 'username');
                  }}
                />
              </View>
              <View
                style={
                  passwordValidate
                    ? styles.textInputBoxView
                    : styles.textInputBoxViewError
                }>
                <View style={styles.passwordBoxInput}>
                  <TextInput
                    style={styles.textInputTextView}
                    placeholder={'Password'}
                    placeholderTextColor={'#7d7d7d'}
                    secureTextEntry={secureTextEntryValue}
                    onChangeText={text => {
                      this.validate(text, 'password');
                    }}
                  />
                </View>
                <View style={styles.eyeImageView}>
                  <TouchableOpacity
                    onPress={() => this.toggleSecureTextInput()}>
                    <Image source={imageConstants.eye} />
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={
                  matchPassword
                    ? styles.textInputBoxView
                    : styles.textInputBoxViewError
                }>
                <View style={styles.passwordBoxInput}>
                  <TextInput
                    style={styles.textInputTextView}
                    placeholder={'Repeat Password'}
                    placeholderTextColor={'#7d7d7d'}
                    secureTextEntry={secureTextEntryValue}
                    onChangeText={text => {
                      this.matchPassword(text);
                    }}
                  />
                </View>
                <View style={styles.eyeImageView}>
                  <TouchableOpacity
                    onPress={() => this.toggleSecureTextInput()}>
                    <Image source={imageConstants.eye} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.buttonFlexView}>
              <TouchableOpacity style={styles.loginButtonView}>
                <View style={styles.loginView}>
                  <Image
                    source={imageConstants.tick}
                    style={styles.tickImageView}
                  />
                  <Text style={styles.loginTextView}>SIGN UP</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.termsCondition}>
              <TouchableOpacity>
                <Text style={styles.loginWithText}>Terms of Service</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </SafeAreaView>
    );
  }

  componentDidMount() {}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loginWithView: {flex: 0.15, alignItems: 'center', justifyContent: 'flex-end'},
  termsCondition: {
    height: 20,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  loginWithText: {fontWeight: '500', color: colorConstants.otherTextColor},
  LoginWithIconsView: {
    flex: 0.2,
    flexDirection: 'row',
    marginHorizontal: 40,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  loginTextView: {
    marginVertical: 10,
    color: colorConstants.loginColour,
    fontWeight: '600',
  },
  tickImageView: {height: 30, width: 30, marginRight: 5, marginLeft: -10},
  loginView: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  loginButtonView: {
    width: '70%',
    height: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.84,

    elevation: 3,
  },
  buttonFlexView: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wheelIconView: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    height: 40,
    width: '70%',
  },
  eyeImageView: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  passwordBoxInput: {flex: 0.9},
  textInputBoxView: {
    height: 40,
    width: '70%',
    borderColor: colorConstants.otherTextColor,
    borderBottomWidth: 0.5,
    borderBottomColor: '#000',
    marginBottom: 10,
    flexDirection: 'row',
    marginTop: 15,
    // backgroundColor: 'green',
  },
  textInputBoxViewError: {
    height: 40,
    width: '70%',
    borderColor: colorConstants.otherTextColor,
    borderBottomWidth: 0.5,
    borderBottomColor: '#f00',
    marginBottom: 10,
    flexDirection: 'row',
    marginTop: 15,
    // backgroundColor: 'green',
  },
  textInputTextView: {height: 40, marginBottom: 10, width: '100%'},
  headerView: {
    flexDirection: 'row',
    flex: 0.13,
  },
  headerLeftView: {
    flex: 0.5,
    justifyContent: 'flex-end',
  },
  headerLeftText: {
    marginLeft: 30,
    fontSize: 40,
    fontWeight: 'bold',
  },
  headerRightView: {
    flex: 0.5,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  headerRightText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colorConstants.otherTextColor,
    marginRight: 30,
  },
  bottomView: {flex: 1},
  bottomIconView: {
    flex: 0.2,
    justifyContent: 'center',
    marginTop: 20,
    alignItems: 'center',
  },
  iconImageView: {
    height: 68,
    width: 68,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 34,
    borderColor: '#7d7d7d',
    borderWidth: 3,
  },
  imageIcon: {
    height: 50,
    width: 50,
    margin: 4,
    resizeMode: 'contain',
  },
  textInputFieldsView: {
    flex: 0.5,
    alignItems: 'center',
    marginTop: 20,
  },
});

export default Login;
