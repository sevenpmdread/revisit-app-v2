import 'react-native-gesture-handler';
import React from 'react'
//import {createStackNavigator} from  '@react-navigation/stack'
//import { NavigationContainer } from '@react-navigation/native';
//mport { createAppContainer } from "react-navigation";
//import {createSwitchNavigator} from '@react-navigation/compat'
//import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import AccountScreen from "./src/screens/AccountScreen";
import SigninScreen from "./src/screens/SigninScreen";
import SignupScreen from "./src/screens/SignupScreen";
import TrackCreateScreen from "./src/screens/TrackCreateScreen";
import TrackDetailScreen from "./src/screens/TrackDetailScreen";
import TrackListScreen from "./src/screens/TrackListScreen";
import { Provider as AuthProvider } from './src/context/authContext';
import { setNavigator } from './src/navigationRef';

// const Stack = createStackNavigator();
// const Tab = createBottomTabNavigator();


// const switchNav = () =>{
//   return (
//     <>
//   <Stack.Navigator initialRouteName="loginFlow" screenOptions={{gestureEnabled: true}}>
//     <Stack.Screen name='SignUp' component={SignupScreen} />
//     <Stack.Screen name='SignIn' component={SigninScreen} />
//   </Stack.Navigator>
//   <Tab.Navigator initialRouteName="mainFlow">
//   <Stack.Navigator initialRouteName="trackListFlow" screenOptions={{gestureEnabled: true}}>
//     <Stack.Screen name='TrackList' component={TrackListScreen} />
//     <Stack.Screen name='TrackDetail' component={TrackDetailScreen} />
//   </Stack.Navigator>
//   <Tab.Screen name="TrackCreate" component={TrackCreateScreen} />
//   <Tab.Screen name="Account" component={AccountScreen} />
//   </Tab.Navigator>
//   </>
//   )
// }
const switchNavigator = createSwitchNavigator({
    loginFlow: createStackNavigator({
        SignUp:SignupScreen,
        SignIn:SigninScreen,
    }),
   mainFlow: createBottomTabNavigator({
    trackListFlow:createStackNavigator({
      TrackList:TrackListScreen,
      TrackDetail:TrackDetailScreen
    }),
     TrackCreate:TrackCreateScreen,
     Account:AccountScreen,
   })
})

const App  =  createAppContainer(switchNavigator)

export default() => {
  return(
    <AuthProvider>
      <App ref = {(navigator) => {setNavigator(navigator)}}/>
    </AuthProvider>
  )
}
