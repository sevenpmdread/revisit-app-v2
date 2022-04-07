import AsyncStorage from '@react-native-async-storage/async-storage';
import createDataContext from './createDataContext'
import tracker from '../api/tracker'
import { navigate } from '../navigationRef';

const Reducer = (state,action) => {
  switch(action.type){
    case 'answersforquestion':{
      return {...state,answers:action.payload.answers}}
    case 'getcount':{
      return {...state,meta:action.payload.meta}
    }
    case 'fetchhome':{
      //console.log("fetchhome acroin payload",action.payload)
      return {...state,homescreendata:action.payload}
    }
    case 'add_error':
      return {...state,errorMessage:action.payload}
    case 'signin':
     // console.log(action.payload)
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
    const response = await tracker.get('/api/v1/questions/fetchbulk',config)
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


      console.log(username,email,password)
      const response = await tracker.post('/api/v1/auth/signup',{username,email,password})
    // console.log(response)
      await AsyncStorage.setItem('token',response.data.token)
      await AsyncStorage.setItem('username',username)

     // console.log(response)
      dispatch({type:'signin',payload:{token:response.data.token,username:username}})
   //   fetchHomedata()
      navigate('TrackList')
    }
    catch(error)
    {
      console.log(error)
      dispatch({type:'add_error',payload:'Something went wrong with SignUp'})
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
    navigate('TrackList')

  }
  else{
    navigate('Splash')
  }
}

const signout = dispatch => async ()=> {
  await AsyncStorage.removeItem('token')
  dispatch({type:'signout'})
  navigate('loginFlow')
}

const signin = dispatch => async ({email,password}) => {
  try{
    console.log(email,password)
    const response = await tracker.post('/api/v1/auth/signin',{email,password})
    await AsyncStorage.setItem('token',response.data.token)
    await AsyncStorage.setItem('username',response.data.username)
   // console.log(response.data.username)
    dispatch({type:'signin',payload:{token:response.data.token,username:response.data.username}})
    navigate('TrackList')
  }
  catch(error)
  {
    dispatch({
      type:'add_error',
      payload:error
    })

  }
}



export const {Provider,Context} = createDataContext(
  Reducer,
  {getCount,signUp,signin,clearError,tryLocalSignin,signout,fetchHomedata,getAnswersforid},
  {token:null, errorMessage:'',homescreendata:{},username:'',answers:[],meta:{}}
)
