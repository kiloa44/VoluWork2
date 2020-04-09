import React from 'react';
import * as firebase from 'firebase';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './components/login';
import Signup from './components/signup';
import Dashboard from './components/dashboard';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      initialRouteName="Signup"
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#00ff11',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen 
        name="Signup" 
        component={Signup} 
        options={{ title: 'Signup' }}
      />       
      <Stack.Screen 
        name="Login" 
        component={Login} 
        options={
          {title: 'Login'},
          {headerLeft: null} 
        }
      />
      <Stack.Screen 
       name="Dashboard" 
       component={Dashboard} 
       options={
         { title: 'Dashboard' },
         {headerLeft: null} 
       }
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
var firebaseConfig = {
    apiKey: "AIzaSyDG1I6IHA2gd2a4916Y5kW65xWmFoZRqPw",
    authDomain: "voluwork-1.firebaseapp.com",
    databaseURL: "https://voluwork-1.firebaseio.com",
    projectId: "voluwork-1",
    storageBucket: "voluwork-1.appspot.com",
    messagingSenderId: "104135268148",
    appId: "1:104135268148:web:e3faf9859dc6035e7eb761",
    measurementId: "G-VN76K92826"
  };
  firebase.initializeApp(firebaseConfig);
