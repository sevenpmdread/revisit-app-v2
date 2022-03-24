import AsyncStorage from '@react-native-async-storage/async-storage';
import createDataContext from './createDataContext'
import tracker from '../api/tracker'
import { navigate } from '../navigationRef';
const authReducer = (state,action) => {
  switch(action.type){
    case 'add_error':
      return {...state,errorMessage:action.payload}
    case 'signin':
      return {errorMessage:'',token:action.payload}
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

const signUp = dispatch => async ({username,email,password}) => {

    try {
  //    console.log(email)
      const response = await tracker.post('/signup',{username,email,password})
     //console.log(response.data.token)
      await AsyncStorage.setItem('token',response.data.token)
      await AsyncStorage.setItem('username',username)

     // console.log(response)
      dispatch({type:'signin',payload:response.data.token})
      navigate('TrackList')
    }
    catch(error)
    {
      //console.log(error)
      dispatch({type:'add_error',payload:'Something went wrong with SignUp'})
    }
  }

const tryLocalSignin = dispatch => async ()=> {

  const token = await AsyncStorage.getItem('token')
  if(token)
  {
    dispatch({type:'signin',payload:token})
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
    const response = await tracker.post('/signin',{email,password})
    await AsyncStorage.setItem('token',response.data.token)
    dispatch({type:'signin',payload:response.data.token})
    navigate('TrackList')
  }
  catch(error)
  {
    dispatch({
      type:'add_error',
      payload:'Something went wrong with sign in'
    })

  }
}



export const {Provider,Context} = createDataContext(
  authReducer,
  {signUp,signin,clearError,tryLocalSignin,signout},
  {token:null, errorMessage:''}
)
