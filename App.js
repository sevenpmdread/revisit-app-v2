import 'react-native-gesture-handler';
import {
  BaseButton,
  GestureHandlerRootView
} from 'react-native-gesture-handler';
import React from 'react'

//import {createStackNavigator} from  '@react-navigation/stack'
//import { NavigationContainer } from '@react-navigation/native';
//mport { createAppContainer } from "react-navigation";
//import {createSwitchNavigator} from '@react-navigation/compat'
//import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AccountScreen from "./src/screens/AccountScreen";
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
import CategoryDrillScreen from './src/comps/CategoryDrillScreen';
import { NavigationContainer } from '@react-navigation/native';
import MainCreateScreen from './src/screens/MainCreateScreen';
import CreateList from './src/comps/CreateList';
import ShareableImageCard from './src/comps/ShareableImageCard';
import ShareCardContrast from './src/comps/ShareCardContrast';
import ShareCardQuestion from './src/comps/ShareCardQuestion';
import ChooseBackgroundImage from './src/comps/ChooseBackground';
import RenderResponses from './src/comps/RenderResponses';
import Questionofday from './src/comps/Questionofday';
import { LogBox } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingScreen from './src/screens/loadingScreen';
import { navigationRef } from './src/navigationRef';
import { Ionicons } from '@expo/vector-icons'

LogBox.ignoreLogs(['Warning: ...']); //Hide warnings

LogBox.ignoreAllLogs()

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
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// const switchNavigator = createSwitchNavigator({
//  // Main:VentScreen,
//  // Share:ShareCardQuestion,
//  // Category:CategoryScreen,
//    //BackgroundImage:ChooseBackgroundImage,
//    ResolveAuth:loadingScreen,
//    createFlow: createStackNavigator({
//     MainCreate:{
//       screen:MainCreateScreen,
//       navigationOptions:{
//         headerTransparent:"true",
//         headerTintColor:'transparent',
//         color:'transparent',
//        //headerStyle:{backgroundColor:"grey"},
//        HeaderTitle:"Home"
//       }

//     },
//     Create:{
//       screen:CreateScreen,
//       navigationOptions:{
//         headerTransparent:"true",
//         headerTintColor:'transparent',
//         color:'transparent',
//        //headerStyle:{backgroundColor:"grey"},
//        HeaderTitle:"Home"
//       }
//     },
//     SignIn:NewSignInScreen,
// },navigationOptions = {
//     headerShown: false,
//   }),
//     loginFlow: createStackNavigator({
//         Splash:SplashScreen,
//         SignUp:NewSignUpScreen,
//         SignIn:NewSignInScreen,
//     },navigationOptions = {
//         headerShown: false,
//       }),
//       mainFlow: createBottomTabNavigator({

//         TrackList:{
//           screen: NewHomeScreen,
//           navigationOptions:{
//             headerShown:false,
//           tabBarLabel:"Categories",
//           tabBarOptions: {
//             showLabel: false,
//             style: {
//              // borderTopLeftRadius:12,
//          //     marginHorizontal:5,
//               borderTopWidth:0,
//               elevation:-5,
//               borderWidth:0,
//               height:60,
//               paddingBottom:2,
//               color:'white',
//               backgroundColor: '#030303',
//           },
//           },
//           tabBarIcon:()=>      <Image source={require('./assets/homeicon.png')} resizeMode='center'/>

//         }},
//         Explore:{
//           screen: ExploreScreen,
//           navigationOptions:{
//           tabBarLabel:"Explore",

//           tabBarOptions: {
//             showLabel: false,
//             style: {
//               borderTopWidth:0,
//               elevation:-5,
//               borderWidth:0,
//               height:70,
//               paddingBottom:2,
//               color:'white',
//               backgroundColor: 'black',
//           },
//           },
//           tabBarIcon: () => (
//             <Image source={require('./assets/exploreicon.png')} resizeMode='center'/>
//             ),
//         }},
//         MainCreate:{
//           screen: MainCreateScreen,
//           navigationOptions:{
//           tabBarLabel:"Answer",

//           tabBarOptions: {
//             showLabel: false,
//             style: {
//               borderTopWidth:0,
//               elevation:-5,
//               borderWidth:0,
//               height:70,
//               paddingBottom:2,
//               color:'white',
//               backgroundColor: 'black',
//           },
//           },
//           tabBarIcon:()=>
//          (
//           <Image source={require('./assets/createicon.png')} resizeMode='center'/>

//          )
//         }},
//         Vent:{
//           screen: VentScreen,
//           navigationOptions:{
//           tabBarLabel:"Vent",

//           tabBarOptions: {
//             showLabel: false,
//             style: {
//               borderTopWidth:0,
//               elevation:-5,
//               borderWidth:0,
//               height:70,
//               paddingBottom:2,
//               color:'white',
//               backgroundColor: 'black',
//           },
//           },
//           tabBarIcon: () => (

//     <Image source={require('./assets/mindicon.png')} resizeMode='center'/>
//     ),
//         }},
//         Account:{
//           screen: AccountScreen,
//           navigationOptions:{
//           tabBarLabel:"Account",
//           tabBarOptions: {
//             showLabel: false,
//             style: {
//               borderTopWidth:0,
//               elevation:-5,
//               borderWidth:0,
//               height:70,
//               paddingBottom:2,
//               color:'white',
//               backgroundColor: '#030303',
//           },
//           },
//           tabBarIcon:()=>
//           (
//             <Image source={require('./assets/accounticon.png')} resizeMode='center'/>

//           )
//         }},
//        }),
//       mainFlow2: createStackNavigator({
//         HomeScreen:{
//           screen: NewHomeScreen,
//           navigationOptions:{
//             headerShown:false,

//           tabBarLabel:"Home",
//           tabBarOptions: {
//             showLabel: false,
//             style: {
//              // borderTopLeftRadius:12,
//          //     marginHorizontal:5,
//               borderTopWidth:0,
//               elevation:-5,
//               borderWidth:0,
//               height:60,
//               paddingBottom:2,
//               color:'white',
//               backgroundColor: '#030303',
//           },
//           },
//           tabBarIcon:()=>      <Image source={require('./assets/homeicon.png')} resizeMode='center'/>

//         }},
//         Category:{
//          screen: CategoryScreen,
//          navigationOptions:{
//            headerTransparent:"true",
//            headerTintColor:'white',
//            color:'white',
//           //headerStyle:{backgroundColor:"grey"},
//           HeaderTitle:"Home"
//          }
//         },
//         RenderResponses:{
//           screen:RenderResponses,
//           navigationOptions:{
//            // headerTransparent:"false",
//             headerTintColor:'white',
//             color:'white',
//            headerStyle:{backgroundColor:"#121212",color:'white'},
//            HeaderTitle:"Home"
//           }
//         },
//         CategoryDrill:{
//           screen: CategoryDrillScreen,
//           navigationOptions:{
//             headerTransparent:"true",
//             headerTintColor:'white',
//             color:'white',
//            //headerStyle:{backgroundColor:"grey"},
//            HeaderTitle:"Home"
//           }
//          }
//        },navigationOptions = {
//         headerShown: false,
//       }),
// })

// const App  =  createAppContainer(switchNavigator)

// export default() => {
//   return(
//     <AuthProvider>
//       <NavigationContainer>
//       <App ref = {(navigator) => {setNavigator(navigator)}}/>
//       </NavigationContainer>
//     </AuthProvider>
//   )
// }
function HomeTabs() {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown:false,
      tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
              iconName = focused? 'apps': 'apps-outline';
          } else if (route.name === 'Explore') {
              iconName = focused ? 'search' : 'search-outline';
          }
          else if (route.name === 'Create') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
        }
        else if (route.name === 'Vent') {
          iconName = focused ? 'create' : 'create-outline';
      }
      else if (route.name === 'Account') {
        iconName = focused ? 'radio-button-on' : 'radio-button-off-outline';
    }


          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: 'white',
      tabBarInactiveTintColor: 'grey',
      //Tab bar styles can be added here
      tabBarStyle:{paddingVertical: 5,borderTopLeftRadius:0,borderTopRightRadius:0,backgroundColor:'black',position:'absolute',height:60,borderTopColor:'black'},
      tabBarLabelStyle:{paddingBottom:3},
  })}
    >
      <Tab.Screen name="Home" component={NewHomeScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Create" component={MainCreateScreen} />
      <Tab.Screen name="Vent" component={VentScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
}
function SignFlow() {
  return (
    <Stack.Navigator
       screenOptions={{
        headerShown: false
      }}>
    <Stack.Screen name="Splash" component={SplashScreen} />
    <Stack.Screen name="SignUp" component={NewSignUpScreen} />
    <Stack.Screen name="SignIn" component={NewSignInScreen} />
    </Stack.Navigator>
  );
}




export default () => {

  return(
    <AuthProvider>
      <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
       screenOptions={{
        headerShown: false
      }}>

      <Stack.Screen name="ResolveAuth" component={LoadingScreen}
      />
      <Stack.Screen name="Sign" component={SignFlow} />
      <Stack.Screen name="HomeTabs" component={HomeTabs} />
      <Stack.Screen name="Category" component={CategoryScreen} />
      <Stack.Screen name="CategoryDrill" component={CategoryDrillScreen} />
      <Stack.Screen name="RenderResponses" component={RenderResponses} />
      <Stack.Screen name="CreateAnswer" component={CreateScreen} />
     </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  )
}
