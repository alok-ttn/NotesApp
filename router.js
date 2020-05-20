/* eslint-disable react-native/no-inline-styles */
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import LoginScreen from './src/Components/login';
import * as React from 'react';
import {Provider} from 'react-redux';
import store from './src/Services/rootReducer';
import videolist from './src/Components/videosList';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {set} from 'react-native-reanimated';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavi() {
  return (
    <Drawer.Navigator
      drawerStyle={{
        backgroundColor: '#4a4a4a',
        shadowColor: '#f2f2f2',
      }}>
      <Drawer.Screen name="Home" component={videolist} />
      <Drawer.Screen name="Live tv" component={videolist} />
      <Drawer.Screen name="movies" component={videolist} />
      <Drawer.Screen name="TV Shows" component={videolist} />
      <Drawer.Screen name="Sports" component={videolist} />
      <Drawer.Screen name="Kids" component={videolist} />
      <Drawer.Screen name="Settings" component={set} />
    </Drawer.Navigator>
  );
}
const MyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="videolist"
        component={DrawerNavi}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
