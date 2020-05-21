/* eslint-disable react-native/no-inline-styles */
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import LoginScreen from './src/Components/login';
import * as React from 'react';
import notesList from './src/Components/notesList';
import {createDrawerNavigator} from '@react-navigation/drawer';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavi() {
  return (
    <Drawer.Navigator
      drawerStyle={{
        backgroundColor: '#4a4a4a',
        shadowColor: '#f2f2f2',
      }}>
      <Drawer.Screen name="DarkMode" component={notesList} />
      <Drawer.Screen name="Logout" component={notesList} />
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
        name="notesList"
        component={DrawerNavi}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
};

export default App;
