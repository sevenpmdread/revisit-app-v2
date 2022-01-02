import AsyncStorage from '@react-native-async-storage/async-storage';
import createDataContext from './createDataContext'
import tracker from '../api/tracker'
import { navigate } from '../navigationRef';
const authReducer = (state,action) => {
  switch(action.type){

    case 'add_error':
      return {...state,errorMessage:action.payload}
    case 'signup':
      return {errorMessage:'',token:action.payload}
    default:
      return state
  }
}

const signUp = (dispatch) => {
  return async ({email,password}) => {

    try {
      const response = await tracker.post('/signup',{email,password})
      await AsyncStorage.setItem('token',response.data.token)
      dispatch({type:'signup',payload:response.data.token})
      navigate('TrackList')
    }
    catch(error)
    {
      dispatch({type:'add_error',payload:'Something went wrong with SignUp'})
    }
  }
}

const signin = (dispatch) => {
  return ({email,password}) => {

  }
}

const signout  = (dispatch) => {
  return ({email}) => {

  }
}

export const {Provider,Context} = createDataContext(
  authReducer,
  {signUp,signin},
  {token:null, errorMessage:''}
)
