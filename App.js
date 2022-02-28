import React from 'react'
//import {createStackNavigator} from  '@react-navigation/stack'
//import { NavigationContainer } from '@react-navigation/native';
//mport { createAppContainer } from "react-navigation";
//import {createSwitchNavigator} from '@react-navigation/compat'
//import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator, HeaderTitle } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import AccountScreen from "./src/screens/AccountScreen";
import SigninScreen from "./src/screens/SigninScreen";
import SignupScreen from "./src/screens/SignupScreen";
import TrackCreateScreen from "./src/screens/TrackCreateScreen";
import TrackDetailScreen from "./src/screens/TrackDetailScreen";
import TrackListScreen from "./src/screens/TrackListScreen";
import { Provider as AuthProvider } from './src/context/authContext';
import { setNavigator } from './src/navigationRef';
import loadingScreen from './src/screens/loadingScreen';
import NewHomeScreen from './src/screens/NewHomeScreen';
import SplashScreen from './src/screens/SplashScreen';
import NewSignUpScreen from './src/screens/NewSignUpScreen';
import NewSignInScreen from './src/screens/NewSignInScreen';
import {Image} from 'react-native'
import  ExploreScreen from './src/screens/ExploreScreen';
import CreateScreen from './src/screens/CreateScreen';
import VentScreen from './src/screens/VentScreen';
import CategoryScreen from './src/screens/CategoryScreen';
import ShareImage from './src/screens/ShareImage';
import CategoryDrillScreen from './src/comps/CategoryDrillScreen';
import { NavigationContainer } from '@react-navigation/native';
import ShareableImage from './src/comps/ShareableImage';
import ShareableImageMag from './src/comps/ShareableImageMag';
import ShareableImageQuestion from './src/comps/ShareableImageQuestion';
//import { createStackNavigator } from '@react-navigation/stack';

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
//const Stack = createStackNavigator();

const switchNavigator = createSwitchNavigator({
  //Share:ShareableImageQuestion,
  //Category:CategoryScreen,
   // Share:ShareableImage,
    ResolveAuth:loadingScreen,
    loginFlow: createStackNavigator({
        Splash:SplashScreen,
        SignUp:NewSignUpScreen,
        SignIn:NewSignInScreen,
    },navigationOptions = {
        headerShown: false,
      }),
      mainFlow: createBottomTabNavigator({

        TrackList:{
          screen: NewHomeScreen,
          navigationOptions:{
            headerShown:false,
          tabBarLabel:"Categories",
          tabBarOptions: {
            showLabel: false,
            style: {
             // borderTopLeftRadius:12,
         //     marginHorizontal:5,
              borderTopWidth:0,
              elevation:-5,
              borderWidth:0,
              height:60,
              paddingBottom:2,
              color:'white',
              backgroundColor: '#030303',
          },
          },
          tabBarIcon:()=>      <Image source={require('./assets/homeicon.png')} resizeMode='center'/>

        }},
        Explore:{
          screen: ExploreScreen,
          navigationOptions:{
          tabBarLabel:"Explore",

          tabBarOptions: {
            showLabel: false,
            style: {
              borderTopWidth:0,
              elevation:-5,
              borderWidth:0,
              height:70,
              paddingBottom:2,
              color:'white',
              backgroundColor: 'black',
          },
          },
          tabBarIcon: () => (
            <Image source={require('./assets/exploreicon.png')} resizeMode='center'/>
            ),
        }},
        Create:{
          screen: CreateScreen,
          navigationOptions:{
          tabBarLabel:"Answer",

          tabBarOptions: {
            showLabel: false,
            style: {
              borderTopWidth:0,
              elevation:-5,
              borderWidth:0,
              height:70,
              paddingBottom:2,
              color:'white',
              backgroundColor: 'black',
          },
          },
          tabBarIcon:()=>
         (
          <Image source={require('./assets/createicon.png')} resizeMode='center'/>

         )
        }},
        Vent:{
          screen: VentScreen,
          navigationOptions:{
          tabBarLabel:"Vent",

          tabBarOptions: {
            showLabel: false,
            style: {
              borderTopWidth:0,
              elevation:-5,
              borderWidth:0,
              height:70,
              paddingBottom:2,
              color:'white',
              backgroundColor: 'black',
          },
          },
          tabBarIcon: () => (

    <Image source={require('./assets/mindicon.png')} resizeMode='center'/>
    ),
        }},
        Account:{
          screen: AccountScreen,
          navigationOptions:{
          tabBarLabel:"Account",
          tabBarOptions: {
            showLabel: false,
            style: {
              borderTopWidth:0,
              elevation:-5,
              borderWidth:0,
              height:70,
              paddingBottom:2,
              color:'white',
              backgroundColor: '#030303',
          },
          },
          tabBarIcon:()=>
          (
            <Image source={require('./assets/accounticon.png')} resizeMode='center'/>

          )
        }},
       }),
      mainFlow2: createStackNavigator({
        HomeScreen:{
          screen: NewHomeScreen,
          navigationOptions:{
            headerShown:false,

          tabBarLabel:"Home",
          tabBarOptions: {
            showLabel: false,
            style: {
             // borderTopLeftRadius:12,
         //     marginHorizontal:5,
              borderTopWidth:0,
              elevation:-5,
              borderWidth:0,
              height:60,
              paddingBottom:2,
              color:'white',
              backgroundColor: '#030303',
          },
          },
          tabBarIcon:()=>      <Image source={require('./assets/homeicon.png')} resizeMode='center'/>

        }},
        Category:{
         screen: CategoryScreen,
         navigationOptions:{
           headerTransparent:"true",
           headerTintColor:'white',
           color:'white',
          //headerStyle:{backgroundColor:"grey"},
          HeaderTitle:"Home"
         }
        },
        CategoryDrill:{
          screen: CategoryDrillScreen,
          navigationOptions:{
            tabBarOptions:{

            },
            headerTransparent:"true",
            headerTintColor:'white',
            color:'white',
           //headerStyle:{backgroundColor:"grey"},
           HeaderTitle:"Home"
          }
         }
       },navigationOptions = {
        headerShown: false,
      }),
})

const App  =  createAppContainer(switchNavigator)

export default() => {
  return(
    <AuthProvider>
      <NavigationContainer>
      <App ref = {(navigator) => {setNavigator(navigator)}}/>
      </NavigationContainer>
    </AuthProvider>
  )
}
