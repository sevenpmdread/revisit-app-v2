import AsyncStorage from '@react-native-async-storage/async-storage';
import createDataContext from './createDataContext'
import tracker from '../api/tracker'
import { navigate } from '../navigationRef';
const getCount = async(id) => {
  try{
    console.log("IN GET COUNT")
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
    console.log("API GET COUNT DATA",getCount.data)
   return getCount.data
  }
  catch(error)
  {
    return error
  }
}
 var data = {

 }



const getPinsbythisuser = async() => {
  try{

    const token = await AsyncStorage.getItem('token')
    const username = await AsyncStorage.getItem('username')
    var data = {
      "username":username
    }
    const response = await tracker.post(`/api/v1/pin/getPins`,data, {headers:{ Authorization: 'Bearer ' + token}})
    //console.log("RESPONSE DATA",response.data)
    return response.data

  }
  catch(error)
  {
return error
  }
}
const getResponsesbythisuser = async() => {
  try{

    const token = await AsyncStorage.getItem('token')
    const username = await AsyncStorage.getItem('username')
    var data = {
      "username":username
    }
    const response = await tracker.post(`/api/v1/answers/getresponses`,data, {headers:{ Authorization: 'Bearer ' + token}})
    //console.log("RESPONSE DATA",response.data)
    return response.data

  }
  catch(error)
  {
return error
  }
}

const getAnswersforid = async (id,limit,skip) => {
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
    var data = {
      "id": id,
      "limit":limit,
      "skip":skip

    }
    //console.log("IN GET ANSWERS FOR ID RESPONSE",token)

    const response = await tracker.post(`/api/v1/answers/getanswer`,data, {headers:{ Authorization: 'Bearer ' + token}})
   // config.params = {i}
    // const getcount = await tracker.get(`api/v1/meta/${id}`,config)

   console.log("IN GET ANSWERS FOR ID REST API",response.data)
    return response.data.answers
  }
  catch(error) {
    console.log(error)
    return error
  }
}



const sharepost = async(id) => {
  console.log("in sharepost")
  const token = await AsyncStorage.getItem('token')
  let config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
    params: {
      id
    }
  }
  var data = {
    "postid": id,
  }

  const response = await tracker.post('api/v1/meta/sharecount',data,{headers:{ Authorization: 'Bearer ' + token}})
  console.log("in share post",response.data)

}
const pinpost = async(id) => {
  try{
    console.log("pinpost")

    const token = await AsyncStorage.getItem('token')
    const username = await AsyncStorage.getItem('username')
    var data = {
      "post_id": id,
      "pinnedbyuser": username
    }
    const response = await tracker.post('api/v1/pin/pinpost',data,{headers:{ Authorization: 'Bearer ' + token}})
    console.log("pinpost",response)
    return response
  }
  catch(error)
  {
return error
  }
}
const unpinPost = async(id) => {
  try{
    console.log("pinpost")
    const token = await AsyncStorage.getItem('token')
    const username = await AsyncStorage.getItem('username')
    var data = {
      "post_id": id,
      "pinnedbyuser": username
    }
    const response = await tracker.post('api/v1/pin/unpin',data,{headers:{ Authorization: 'Bearer ' + token}})
    console.log("pinpost",response)
    return response
  }
  catch(error)
  {
return error
  }
}


const checkpinstatus = async(id) => {
  try{
    console.log("pin status")
    const token = await AsyncStorage.getItem('token')
    const username = await AsyncStorage.getItem('username')
    var data = {
      "postid": id,
      "username": username
    }
    console.log("DATA THAT I AM PASSSING TO FINDPOST",data)
    const response  = await tracker.post(`api/v1/pin/findpost`,data,{headers:{ Authorization: 'Bearer ' + token}})
    console.log("pin status",response.data)
    if(response.data.pin.length >0)
    {
      return 1
    }
    else
    return 0

  }
  catch(error) {

  }
}

export {getResponsesbythisuser,getAnswersforid,getCount,pinpost,checkpinstatus,unpinPost,sharepost,getPinsbythisuser}
