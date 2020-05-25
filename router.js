/* eslint-disable react-native/no-inline-styles */
import {
  View,
  SafeAreaView,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  AsyncStorage,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';
import LoginScreen from './src/Components/login';
import * as React from 'react';
import notesList from './src/Components/notesList';
import Splash from './src/Components/splash';
import {
  DrawerContentScrollView,
  createDrawerNavigator,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import {Provider} from 'react-redux';
import store from './src/Services/rootReducer';
import {imageConstants, colorConstants} from './src/config/constants';
import {DrawerContent} from './src/Components/DrawerContent';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
    };
  }
  render() {
    return <MyApp />;
  }
}
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
function DrawerNavi() {
  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerContent {...props} />}
      drawerContentOptions={{
        activeTintColor: colorConstants.fontColourDark,
        inactiveTintColor: colorConstants.fontColourDark,
        itemStyle: {marginVertical: 5},
      }}
      drawerStyle={{
        backgroundColor: colorConstants.backgroundColourLight,
        shadowColor: '#f2f2f2',
      }}>
      <Drawer.Screen name="Notes Screen" component={notesList} />
    </Drawer.Navigator>
  );
}
const _logout = async () => {
  await AsyncStorage.clear();
  this.props.toggleSplash();
  this.props.navigation.navigate('LoginScreen');
};
const MyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="notesList"
        component={DrawerNavi}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const MyApp = () => {
  return (
    <Provider store={store}>
      <NavigationContainer theme={DefaultTheme}>
        <MyStack />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
