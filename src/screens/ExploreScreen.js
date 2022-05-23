import { StyleSheet, Text, View,Image,FlatList,RefreshControl,Animated } from 'react-native'
import React,{useEffect,useState,useCallback,useRef} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card } from 'react-native-elements';
import { useFonts, Inter_500Medium,Inter_400Regular,Inter_600SemiBold} from '@expo-google-fonts/inter';
//import { categoryquestions } from '../dummydata';
import RenderExploreFeed from '../comps/RenderExploreFeed';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { explore } from '../context/restapi';
import LoadingScreennew from './Loadingnew';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ventexplore } from '../context/restapi';

//import RenderCategoryfeed from '../comps/RenderCategoryfeed';
const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}
const ExploreScreen = ({navigation,route}) => {
  const expanded = true;
  const scrollY = useRef(new Animated.Value(expanded ? 1 : 0)).current
  const  vent = route.params?.vent
 // const [ventload,setVent] = useState(false)
  //setVent(reload ? true : false)
  //if(vent)
  //setVent(true)
  const [refreshing, setRefreshing] = useState(false);



  const [answers,setanswers] = useState()
  const [respcount,setrespcount] = useState(0)
  const [lastanswerd,setlastanswered] = useState()
  const [skip,setskip]  = useState(0)
  const [isLoading,setLoading] = useState(false)
  const [isquestionLoading,setquestionLoading] = useState(false)
  const [exploreques,setexploreques] = useState([])
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() =>
    {
      setRefreshing(false)
      setexploreques([])
      setskip(0)
    }
    );
  }, []);
  const onload = useCallback(async () => {
    const data =  await explore(skip)
    //console.log("data post post post ",data.posts)
   let arr = [...exploreques,...data.posts]
   setLoading(false)
  setexploreques(arr)
  }, [skip]);
  let arr = []

  useEffect(() => {
    //  console.log("I AM CALLED ID USEEFFECT")
      // declare the data fetching function
    //   if(route.params?.refresh)
    //  { navigation.addListener('focus', () => {
    //   //  console.log("NAVIGATION",route,navigation)
    //     onRefresh()
    //   });
    //   navigation.setParams({refresh: false})
    // }
      const fetchData = async () => {

      //  console.log("FOUND FOUND")
      let data = {}
      //   let exploreasync = await AsyncStorage.getItem('exploredata')
      //   if(exploreasync && skip == 0)
      //  {
      //  data = JSON.parse(exploreasync)
      //   }
      //   else
      if(vent)
      {
        data =  await ventexplore(skip)
        //console.log("VENT",data.posts)
      }
      else
         data =  await explore(skip)
        //console.log("data post post post ",data.posts)
       let arr = [...exploreques,...data.posts]
       setquestionLoading(false)
        setexploreques(arr)
       // console.log("explore explore",exploreques,exploreques.length)
      //  console.log("ar ar ar ar r",arr)



      }

      // call the function
      setquestionLoading(true)
      fetchData()


    }, [refreshing,skip])
  let [fontsLoaded] = useFonts({
    "Intermedium": Inter_500Medium,
    "InterRegular":Inter_400Regular,
    "InterSemi":Inter_600SemiBold
   });
  return (


      <ScrollView
    contentContainerStyle={styles.container}
    nestedScrollEnabled={true}

    // refreshControl={
    //   <RefreshControl
    //     refreshing={refreshing}
    //     onRefresh={onRefresh}
    //   />
    // }
    >
      {
        isLoading?
        <LoadingScreennew/>
        :
        <FlatList
        contentContainerStyle={{marginLeft:2}}
       //  horizontal={true}
        // style={{flex:1}}
          data = {exploreques}

         renderItem={(item,index)=>
          {
      //  /   console.log("RENDER EXPLORE FEED",item)
         return <RenderExploreFeed navigation={navigation} post={item.item} vent={vent}/>}
         }
         keyExtractor={item => item._id}
         showsVerticalScrollIndicator={true}
         extraData={exploreques}
         onEndReached={() => {
          setskip(skip+1)
          //  const loaddata = async() => {
          //   setquestionLoading(true)
          //   let data =  await explore(skip)
          //   //console.log("data post post post ",data.posts)
          //  let arr = [...exploreques,...data.posts]
          //  setLoading(false)
          //  setexploreques(arr)
          //  setquestionLoading(false)
          //  }
          //  setskip(skip+1)
          //  loaddata()
         }}
         refreshControl={
           <RefreshControl
             refreshing={refreshing}
             onRefresh={onRefresh}
           />
         }




         />

       }
        {isquestionLoading ?
         <Text style={{color:'white',fontSize:12,alignSelf:'center',padding:12}}>Loading...</Text>
          : <></>}
                   <Text style={{color:'white',fontSize:12,alignSelf:'center',padding:32}}>Loading...</Text>



 {/* {
        !isLoading ?
      <TouchableOpacity style={{paddingTop:6}} onPress={()=>setskip(skip+1)}>
        <Text style={{color:'white',alignSelf:'center',marginBottom:10}}>Load more</Text>
      </TouchableOpacity>
      :
      <LoadingScreennew/>
} */}

{/* <TouchableOpacity  onPress={()=>setskip(skip+1)}>
        <Text style={{color:'white',alignSelf:'center',marginBottom:10}}>Load more</Text>
</TouchableOpacity> */}
{/* </View> */}

    </ScrollView>
  )
}

export default ExploreScreen

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#0C0C0C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  feed:{
    backgroundColor: '#0C0C0C',
    flex:1
  },
  textArea:{
    width:270,
    paddingLeft:30
  },
  discoverCard:{
    backgroundColor:'#171717',
    marginHorizontal:0,
    borderRadius:20,
    flexDirection:'row',
    borderWidth:0,
    padding:16,
    borderWidth:2,
    borderColor:"#191919"

  },
  container: {
    flex: 1,
   // flexGrow:2,
    backgroundColor: '#0C0C0C',
    paddingHorizontal:8,
   // flexWrap:'wrap',
    //flexDirection:'column'
       // paddingTop:20
  },
  header:{
    marginTop:20
  },
  headerText:{
    fontFamily:'InterSemi',
    color:'white',
    fontSize:22
  },
  maincontainer: {
    flex: 1,
    alignItems: 'center', justifyContent: 'center'
  },

})
