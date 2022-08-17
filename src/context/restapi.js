import AsyncStorage from '@react-native-async-storage/async-storage';
import Storage from 'react-native-storage';
import createDataContext from './createDataContext'
import tracker from '../api/tracker'
import { navigate } from '../navigationRef';
import uuid from 'react-native-uuid';


const storage = new Storage({
  // maximum capacity, default 1000 key-ids
  size: 1000,

  // Use AsyncStorage for RN apps, or window.localStorage for web apps.
  // If storageBackend is not set, data will be lost after reload.
  storageBackend: AsyncStorage, // for web: window.localStorage

  // expire time, default: 1 day (1000 * 3600 * 24 milliseconds).
  // can be null, which means never expire.
  defaultExpires: null,

  // cache data in the memory. default is true.
  enableCache: true,

  // if data was not found in storage or expired data was found,
  // the corresponding sync method will be invoked returning
  // the latest data.
  sync: {
    // we'll talk about the details later.
  }
});

const postAnswer = async(question_id,answer_text,isAnonymous) => {
  try{

    const token = await AsyncStorage.getItem('token')
    const username = await AsyncStorage.getItem('username')
    var data = {
      "question_id":question_id,
      "answer_text":answer_text,
      "username":username,
      "isAnonymous":isAnonymous
    }
    const response = await tracker.post(`/api/v1/answers/`,data, {headers:{ Authorization: 'Bearer ' + token}})
  }
  catch(error)
  {
return error
  }
}



const updatetoken = async(devicetoken) => {
  try{
    const token = await AsyncStorage.getItem('token')
    const username = await AsyncStorage.getItem('username')
    var data = {
      "username":username,
      "devicetoken":devicetoken,
    }
    const upadtetoken = await tracker.post(`api/v1/auth/updatetoken`,data,{headers:{ Authorization: 'Bearer ' + token}})

  }
  catch(error)
  {
    console.log(error)
  }
}


const getRandomQuestion = async() => {
  try{
    const token = await AsyncStorage.getItem('token')
    let config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    }
    const question = await tracker.get(`api/v1/questions/random`,config)
    return question.data.question[0]

  }
  catch(error)
  {
  }
}

const getAllQuestions = async(skip) => {
  try{
    const token = await AsyncStorage.getItem('token')
    let config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    }
    const questions = await tracker.get(`api/v1/questions/${skip}`,config)
    if(skip == 0)
    {
      const questionsdata = await AsyncStorage.setItem('createscreenquestions',JSON.stringify(questions.data))
    }
    //(exploredate.data)
    return questions.data

  }
  catch(error)
  {
    (error)
  }
}


const addNotifStore = async(notification,id) =>{
  try{
    let response = []
const ret = await storage.load({
      key: 'notification',
    })
    console.log("notification ret",notification,ret)

     console.log("ret",ret)
     ret.notification.push(notification)
    await storage.save({
      key: 'notification', // Note: Do not use underscore("_") in key!
      data: ret,
      expires:null
    });



  }
  catch(error)
  {
    console.log(error)
    return false
  }
}

const addventstore = async({question_text,answer_text,publised,id}) =>{
  try{
    let response = []
   // await AsyncStorage.removeItem('Reminders');
   const fetchdata = async() => {

const ret = await storage.load({
      key: 'Ventnotes',
      id: id
    })
    var answerobj = {
      answer_text:answer_text,
      published:publised,
      answerId:uuid.v4(),
      timestamp:new Date()
    }
    ret.answer.push(answerobj)
    await storage.save({
      key: 'Ventnotes', // Note: Do not use underscore("_") in key!
      id,
      data: ret,

      // if expires not specified, the defaultExpires will be applied instead.
      // if set to null, then it will never expire.
      expires:null
    });

  }
 fetchdata()
  }
  catch(error)
  {
    return false
  }
}
const getvent = async() => {
  try{

     let storedVent = await AsyncStorage.getItem('Ventnotes');
     if (storedVent !== null) {
       storedVent = JSON.parse(storedVent)
       return storedVent
     }
     else
     {
       return([])
     }


   }
   catch(error)
   {
     console.log("error",error)
     return false
   }
}

const getnotificationsall = async() => {

  try{
    let response = []
   // await AsyncStorage.removeItem('Reminders');

   return  await storage.load({
    key: 'notification',
  })



  }
  catch(error)
  {
    console.log("error",error)
    return false
  }
}

const getventall = async() => {

  try{
    let response = []
   // await AsyncStorage.removeItem('Reminders');
   const fetchdata = async() => {
   const ids = await storage.getIdsForKey('Ventnotes')
   //console.log(ids)
   for(let i =0;i < ids.length;i++)
   {
    const ret = await storage.load({
      key: 'Ventnotes',
      id: ids[i]
    })
    ret.id = ids[i]
    response.push(ret)

   }
   return response

  }
  return fetchdata()
  }
  catch(error)
  {
    console.log("error",error)
    return false
  }
}

const removeventquestion = async(id)=> {
  try{
    await storage.remove({
      key: 'Ventnotes',
      id: id
    });
  }
  catch(error)
  {
    console.log(error)
  }
}
const storeventnew = async(ventobj) => {

  try{


    //ventobj -> question_text,answer_text,published

    var dataobj = {
      question_text : ventobj.question_text,
      answer : [{answer_text:ventobj.answer_text,published:ventobj.published,answerId:uuid.v4(),timestamp:new Date()}]
    }
    storage.save({
      key: 'Ventnotes', // Note: Do not use underscore("_") in key!
      data: dataobj,
      id: uuid.v4(),
      // if expires not specified, the defaultExpires will be applied instead.
      // if set to null, then it will never expire.
      expires:null
    });
  }
  catch(error)
  {
    console.log(error)

  }
}
const setReminders = async(reminderobj) => {

  try{
   // await AsyncStorage.removeItem('Reminders');
    if(reminderobj)
    {

   //
    let storedReminders = await AsyncStorage.getItem('Reminders');
    if (storedReminders !== null) {
      storedReminders = JSON.parse(storedReminders)
      storedReminders.filter(obj => {
        if (obj.postid === reminderobj.postid)
        throw console.error("POST id already exists");
      })
      ("REACHED THIS PART")
      storedReminders.push(reminderobj)

    }
    else
    {
      storedReminders = []
      storedReminders.push(reminderobj)
    }
  //  (reminderArray, typeof reminderArray,storedReminders)
    await AsyncStorage.setItem('Reminders', JSON.stringify(storedReminders));
    ("AWAIT CONSOOLE SET REMINDER",await AsyncStorage.getItem('Reminders'))
  }
  }
  catch(error)
  {
    ("error",error)
    return false
  }
}

const getReminders = async(postid) => {
  try{
    let value = await AsyncStorage.getItem('Reminders');
    if(value !== null)
    {
      var currentime = new Date()
      value = JSON.parse(value)
     // (value,currentime)
      value = value.filter(obj => obj.date > currentime

      )
   //   ("VALUE",value)
      await AsyncStorage.setItem('Reminders',JSON.stringify(value));
      value.filter(obj => {
        if (obj.postid === postid)
        {
          return obj
        }

      })
      return false
      //("value",value,postid)
    }
    else
    return false
  }
  catch(error)
  {
    ("error",error)
    return error
  }
}
const getAllreminders = async() => {
  try{
    const value = await AsyncStorage.getItem('Reminders');
    if(value !== null)
    {
      return JSON.parse(value)
    }
    else
    throw console.error("no reminder object in storage");
  }
  catch(error)
  {
    ("error",error)
    return error
  }
}


const getQod = async() => {
  try{
    const token = await AsyncStorage.getItem('token')
    let config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    }
    const question = await tracker.get(`api/v1/questions/qod`,config)
    return question.data

  }
  catch(error)
  {
    console.log(error)
  }
}

const fetchHomedata = async() => {
  try{
    const token = await AsyncStorage.getItem('token')
    let config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    }
    const response = await tracker.get('/api/v1/questions/',config)
    const homedate = await AsyncStorage.setItem('homedate',JSON.stringify(response.data))
    return response.data
  }
  catch(error)
  {
    console.log(error)
    return error
  }
}



const ventexplore = async(skip) => {
  try{
    const token = await AsyncStorage.getItem('token')
    let config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    }
    const ventexplore = await tracker.get(`api/v1/questions/ventexplore/${skip}`,config)
   if(skip == 0)
   {
     const ventstorage = await AsyncStorage.setItem('exploredata',JSON.stringify(ventexplore.data))
    }
   // (exploredate.data)
    return ventexplore.data

  }
  catch(error)
  {
    (error)
  }
}
const createVentQuestion = async(question_text,isAnonymous) => {
  try{
    const token = await AsyncStorage.getItem('token')
    const username = await AsyncStorage.getItem('username')
    var data = {
      "question_text":question_text,
      "username":username,
      "isAnonymous":isAnonymous
    }
    const response = await tracker.post(`/api/v1/questions/ventquestion`,data, {headers:{ Authorization: 'Bearer ' + token}})
  }
  catch(error)
  {
    return 'error'
  }
}

const explore = async(skip) => {
  try{
    const token = await AsyncStorage.getItem('token')
    let config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    }
    const exploredate = await tracker.get(`api/v1/questions/explore/${skip}`,config)
   if(skip == 0)
   {
     const exploredata = await AsyncStorage.setItem('exploredata',JSON.stringify(exploredate.data))
    }
   // (exploredate.data)
    return exploredate.data

  }
  catch(error)
  {
    (error)
  }
}

const ventcreate = async(question_text,answer_text,isAnonymous) => {
  try{
    const token = await AsyncStorage.getItem('token')
    const username = await AsyncStorage.getItem('username')
    var data = {
      "question_text":question_text,
      'answer_text':answer_text,
      "username":username,
      "isAnonymous":isAnonymous
    }
    const response = await tracker.post(`/api/v1/answers/ventcreate`,data, {headers:{ Authorization: 'Bearer ' + token}})
   //console.log(response)
   return true
  }
  catch(error)
  {
    return 'error'
  }
}

const getCount = async(id) => {
  try{
    //console.log("IN GET COUNT")
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
    //console.log("API GET COUNT DATA",getCount.data)
   return getCount.data
  }
  catch(error)
  {
    return error
  }
}




const getPinsbythisuser = async() => {
  try{

    const token = await AsyncStorage.getItem('token')
    const username = await AsyncStorage.getItem('username')
    var data = {
      "username":username
    }
    const response = await tracker.post(`/api/v1/pin/getPins`,data, {headers:{ Authorization: 'Bearer ' + token}})
    //("RESPONSE DATA",response.data)
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
    //("RESPONSE DATA",response.data)
    return response.data

  }
  catch(error)
  {
return error
  }
}

const answerforid = async (id) => {
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
    }

    const response = await tracker.post(`/api/v1/answers/answerforid`,data, {headers:{ Authorization: 'Bearer ' + token}})

    return response.data
  }
  catch(error) {
    (error)
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
    //("IN GET ANSWERS FOR ID RESPONSE",token)

    const response = await tracker.post(`/api/v1/answers/getanswer`,data, {headers:{ Authorization: 'Bearer ' + token}})
   // config.params = {i}
    // const getcount = await tracker.get(`api/v1/meta/${id}`,config)

   //console.log("IN GET ANSWERS FOR ID REST API",response.data)
    return response.data.answers
  }
  catch(error) {
    (error)
    return error
  }
}

const getrending  = async() => {
  const token = await AsyncStorage.getItem('token')
  let config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  }

  const response = await tracker.get('api/v1/meta/trending',config)
 // console.log(response.data)
  return response.data
 // ("in share post",response)
}


const upvotequestion = async(id) => {
  // ("in sharepost")
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

   const response = await tracker.post('api/v1/meta/votecount',data,{headers:{ Authorization: 'Bearer ' + token}})
  // ("in share post",response)

 }

const sharepost = async(id) => {
 // ("in sharepost")
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

}
const pinpost = async(id) => {
  try{

    const token = await AsyncStorage.getItem('token')
    const username = await AsyncStorage.getItem('username')
    var data = {
      "post_id": id,
      "pinnedbyuser": username
    }
    const response = await tracker.post('api/v1/pin/pinpost',data,{headers:{ Authorization: 'Bearer ' + token}})
  //  ("pinpost",response)
    return response
  }
  catch(error)
  {
return error
  }
}
const unpinPost = async(id) => {
  try{
   // ("pinpost")
    const token = await AsyncStorage.getItem('token')
    const username = await AsyncStorage.getItem('username')
    var data = {
      "post_id": id,
      "pinnedbyuser": username
    }
    const response = await tracker.post('api/v1/pin/unpin',data,{headers:{ Authorization: 'Bearer ' + token}})
    //("pinpost",response)
    return response
  }
  catch(error)
  {
return error
  }
}


const checkpinstatus = async(id) => {
  try{
   // ("pin status")
    const token = await AsyncStorage.getItem('token')
    const username = await AsyncStorage.getItem('username')
    var data = {
      "postid": id,
      "username": username
    }
  //  ("DATA THAT I AM PASSSING TO FINDPOST",data)
    const response  = await tracker.post(`api/v1/pin/findpost`,data,{headers:{ Authorization: 'Bearer ' + token}})
  //  ("pin status",response.data)
    if(response.data.pin.length >0)
    {
      return 1
    }
    else
    return 0

  }
  catch(error) {
    return error

  }
}

const createContrast = async(contrastId,answerId) => {
  try{
    const token = await AsyncStorage.getItem('token')
    const username = await AsyncStorage.getItem('username')
    var data = {
      "answerId": answerId,
      "contrastId": contrastId
    }
  //  ("DATA THAT I AM PASSSING TO FINDPOST",data)
    const response  = await tracker.post(`api/v1/answers/createContrast`,data,{headers:{ Authorization: 'Bearer ' + token}})
    return response.data
  }
  catch(error)
  {
    return error

  }
}
export {getnotificationsall,addNotifStore,updatetoken,getrending,getQod,addventstore,removeventquestion,getvent,getventall,storeventnew,ventcreate,upvotequestion,createVentQuestion,ventexplore,postAnswer,getRandomQuestion,getAllQuestions,getAllreminders,getReminders,setReminders,fetchHomedata,explore,answerforid,getResponsesbythisuser,getAnswersforid,getCount,pinpost,checkpinstatus,unpinPost,sharepost,getPinsbythisuser,createContrast}
