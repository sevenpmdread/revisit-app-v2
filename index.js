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



import App from './App';
import { addNotifStore } from './src/context/restapi';

import messaging from '@react-native-firebase/messaging';
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
 // console.log('Message handled in the background!', remoteMessage);
 var obj = JSON.parse(remoteMessage.data.keys)

 //console.log('DATA RECIEVED ON SHARE POST NOTIF BACKGROUND',obj)
  await addNotifStore(obj,remoteMessage.messageId)

});

function HeadlessCheck({ isHeadless }) {
  if (isHeadless) {
    // App has been launched in the background by iOS, ignore
    return null;
  }

  return <App />;
}


// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
