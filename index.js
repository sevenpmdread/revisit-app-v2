import 'expo-asset';
import 'expo-dev-client';
// import {
//   // en,
//   // nl,
//   // de,
//   // pl,
//   // pt,
//   enGB,
//   registerTranslation,
// } from 'react-native-paper-dates'
//registerTranslation('en-GB', enGB)

import { registerRootComponent } from 'expo';
import PushNotification from "react-native-push-notification";
PushNotification.configure({
  onNotification: function (notification) {
    console.log("NOTIFICATION:", notification);
  },
  requestPermissions: Platform.OS === 'ios'
})

import App from './App';



// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
