import AsyncStorage from '@react-native-async-storage/async-storage';
import createDataContext from './createDataContext'
import tracker from '../api/tracker'
import { navigate } from '../navigationRef';

const Reducer = (state,action) => {
  switch(action.type){
    case 'answersforquestion':{
      return {...state,answers:action.payload}
    }
    default:
      return state
  }
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
   // console.log("IN GET ANSWERS FOR ID RESPONSe",response.data,id)
    dispatch({type:'answersforquestion',payload:response.data.answers})


  }
  catch(error) {
    console.log(error)
    dispatch({type:'add_error',payload:'Something went wrong with SignUp'})
  }
}


export const {Provider,Context} = createDataContext(
  Reducer,
  {getAnswersforid},
  {answers:[]}
)
