import AsyncStorage from '@react-native-async-storage/async-storage';
import createDataContext from './createDataContext'
import tracker from '../api/tracker'
import messaging from '@react-native-firebase/messaging';
///import { navigate } from '../navigationRef';
import * as navigation from '../navigationRef';
import Storage from 'react-native-storage';

const Reducer = (state,action) => {
  switch(action.type){
    case 'answersforquestion':{
      return {...state,answers:action.payload.answers}}
    case 'getcount':{
      return {...state,meta:action.payload.meta}
    }
    case 'fetchhome':{
      ////console.log("fetchhome acroin payload",action.payload)
      return {...state,homescreendata:action.payload}
    }
    case 'add_error':
      return {...state,errorMessage:action.payload}
    case 'signin':
     // //console.log(action.payload)
      return {...state,errorMessage:'',token:action.payload.token,username:action.payload.username}
    case 'clear_error':
      return {...state, errorMessage:''}
    case 'signout':
      return {token:null, errorMessage:''}
    default:
      return state
  }
}

const clearError = dispatch => () => {
  dispatch({type:'clear_error'})
}


const getAnswersforid = dispatch => async (id) => {
  try{
    const token = await AsyncStorage.getItem('token')
    let config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
      params: {
        id
      }
    }
    //console.log("IN GET ANSWERS FOR ID RESPONSE",token)

    const response = await tracker.get(`/api/v1/answers/${id}`,config)
   // config.params = {i}
    // const getcount = await tracker.get(`api/v1/meta/${id}`,config)

    // console.log(getcount.data)
    dispatch({type:'answersforquestion',payload:{answers:response.data.answers}})
  }
  catch(error) {
    console.log(error)
    dispatch({type:'add_error',payload:'Something went wrong with SignUp'})
  }
}

const getCount = dispatch => async (id) => {
  try{
    const token = await AsyncStorage.getItem('token')
    let config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
      params: {
        id
      }
    }

    const getCount = await tracker.get(`api/v1/meta/${id}`,config)
   // console.log("API GET COUNT DATA",getCount.data)
    dispatch({type:"getcount",payload:{meta :getCount.data}})
  }
  catch(error)
  { console.log(error)
    dispatch({type:'add_error',payload:'Something went wrong with getcount'})

  }
}

const fetchHomedata = dispatch => async () => {
  try{
    console.log("in fetch home")
    const token = await AsyncStorage.getItem('token')
    let config = {
      headers: {
        Authorization: 'Bearer ' + token,
      }
    }
    const response = await tracker.get('/api/v1/questions/',config)
    dispatch({type:'fetchhome',payload:response.data})

  }
  catch(error)
  {
    console.log(error)
    dispatch({type:'add_error',payload:'Something went wrong with SignUp'})

  }
}

const signUp = dispatch => async ({username,email,password}) => {

    try {
      const storage = new Storage({
        // maximum capacity, default 1000
        size: 1000,

        // Use AsyncStorage for RN apps, or window.localStorage for web apps.
        // If storageBackend is not set, data will be lost after reload.
        storageBackend: AsyncStorage, // for web: window.localStorage

        // expire time, default: 1 day (1000 * 3600 * 24 milliseconds).
        // can be null, which means never expire.
        defaultExpires: 1000 * 3600 * 24,

        // cache data in the memory. default is true.
        enableCache: true,

        // if data was not found in storage or expired data was found,
        // the corresponding sync method will be invoked returning
        // the latest data.
        sync: {
          // we'll talk about the details later.
        }
      });


      console.log(username,email,password)
      const fcmToken = await messaging().getToken();
      const response = await tracker.post('/api/v1/auth/signup',{username,email,password,devicetoken:fcmToken}).catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          //console.log(error);
          //console.log(error.response.data.err);
          dispatch({
            type:'add_error',
            payload:error.response.data.err
          })
        }
        else
        {
          //console.log(error);
        }
        return
        //throw error
      });
     //console.log(response)
      await AsyncStorage.setItem('token',response.data.token)
      await AsyncStorage.setItem('username',username)
      await storage.save({
        key: 'notification', // Note: Do not use underscore("_") in key!
        data: {
          notification:[]
        },

        // if expires not specified, the defaultExpires will be applied instead.
        // if set to null, then it will never expire.
        expires: 1000 * 3600
      });

     // //console.log(response)
      dispatch({type:'signin',payload:{token:response.data.token,username:username}})
   //   fetchHomedata()
      navigation.navigate('Onboarding')
    }
    catch(error)
    {

      //dispatch({type:'add_error',payload:error.err})
    }
  }

const tryLocalSignin = dispatch => async ()=> {


  //("inlocalsignin")
  const token = await AsyncStorage.getItem('token')
  const username = await AsyncStorage.getItem('username')
  if(token)
  {
    dispatch({type:'signin',payload:{token:token,username:username}})
   // fetchHomedata()
   navigation.navigate('HomeTabs')

  }
  else{
    navigation.navigate('Sign')
  }
}

const signout = dispatch => async ()=> {
  await AsyncStorage.removeItem('token')
  dispatch({type:'signout'})
  navigation.navigate('Sign')
}

const signin = dispatch => async ({email,password}) => {
  try{
    //console.log(email,password)
    const response = await tracker.post('/api/v1/auth/signin',{email,password}).catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        //console.log(error);
        //console.log(error.response.data.err);
        dispatch({
          type:'add_error',
          payload:error.response.data.err
        })
      }
      else
      {
        //console.log(error);
      }
      return
      //throw error
    });
    //console.log(response)
    await AsyncStorage.setItem('token',response.data.token)
    await AsyncStorage.setItem('username',response.data.username)
   // //console.log(response.data.username)
    dispatch({type:'signin',payload:{token:response.data.token,username:response.data.username}})
    navigation.navigate('HomeTabs')
  }
  catch(error)
  {


  }
}



export const {Provider,Context} = createDataContext(
  Reducer,
  {getCount,signUp,signin,clearError,tryLocalSignin,signout,fetchHomedata,getAnswersforid},
  {token:null, errorMessage:'',homescreendata:{},username:'',answers:[],meta:{}}
)
