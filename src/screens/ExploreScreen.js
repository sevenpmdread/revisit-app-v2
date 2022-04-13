import { StyleSheet, Text, View,Image,FlatList,RefreshControl } from 'react-native'
import React,{useEffect,useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card } from 'react-native-elements';
import { useFonts, Inter_500Medium,Inter_400Regular,Inter_600SemiBold} from '@expo-google-fonts/inter';
//import { categoryquestions } from '../dummydata';
import RenderExploreFeed from '../comps/RenderExploreFeed';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { explore } from '../context/restapi';
import LoadingScreennew from './Loadingnew';
//import RenderCategoryfeed from '../comps/RenderCategoryfeed';
const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}
const ExploreScreen = ({navigation}) => {
  const [refreshing, setRefreshing] = React.useState(false);



  const [answers,setanswers] = useState()
  const [respcount,setrespcount] = useState(0)
  const [lastanswerd,setlastanswered] = useState()
  const [skip,setskip]  = useState(0)
  const [isLoading,setLoading] = useState(false)
  const [exploreques,setexploreques] = useState([])
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() =>
    {
      setRefreshing(false)
      setexploreques([])
      setskip(0)
    }
    );
  }, []);
  let arr = []

  useEffect(() => {
    //  console.log("I AM CALLED ID USEEFFECT")
      // declare the data fetching function
      const fetchData = async () => {

      //  console.log("FOUND FOUND")
      let data = {}
        let exploreasync = await AsyncStorage.getItem('exploredata')
        if(exploreasync && skip == 0)
        {
        data = JSON.parse(exploreasync)
        }
        else
        data =  await explore(skip)
        console.log("data post post post ",data.posts)
       let arr = [...exploreques,...data.posts]
       setLoading(false)
        setexploreques(arr)
        console.log("explore explore",exploreques,exploreques.length)
      //  console.log("ar ar ar ar r",arr)



      }

      // call the function
      setLoading(true)
      fetchData()


    }, [skip])
  let [fontsLoaded] = useFonts({
    "Intermedium": Inter_500Medium,
    "InterRegular":Inter_400Regular,
    "InterSemi":Inter_600SemiBold
   });
  return (
    <ScrollView
    contentContainerStyle={{backgroundColor:'#0C0C0C'}}
    >
    <View style={styles.container}>
      <View style={styles.header}>
      <Text style={styles.headerText}>EXPLORE</Text>
      </View>

        <Card containerStyle={styles.discoverCard}>
        <View style={{flexDirection:'row',}}>
        <Image  source={require('../../assets/ventvector.png')} containerStyle={{marginTop:30}} imageStyle={{marginTop:12}} resizeMode='contain'/>
        <View style={styles.textArea}>
          <Text style={{fontFamily:'InterSemi',color:'white',fontSize:16}}>Discover new questions!</Text>
          <Text  style={{fontFamily:'InterRegular',color:'white',fontSize:12,opacity:0.7,width:200}}>You can use this part of the app to find out questions that are constantly being interacted with, pin answers you like, share them or chose to answer them yourselves!</Text>
        </View>
        </View>
        </Card>
      <View>
      <FlatList
     contentContainerStyle={{marginLeft:8}}
    //  horizontal={true}
   //   style={styles.scrollView}
       data = {exploreques}
     // scrollEventThrottle={16}
   //   snapToInterval={400}
      snapToAlignment ="start"
          decelerationRate={0}
          bounces={true}
          // onScrollBeginDrag={()=>
          // Animated.event([{nativeEvent: {contentOffset:{x:scrollX}}}],
          // {useNativeDriver:true})}
      renderItem={(item,index)=>
       {
         //console.log("in flatlist item flatlist",item)
      return <RenderExploreFeed navigation={navigation} post={item.item}/>}
      }
      keyExtractor={item => item._id}
      showsVerticalScrollIndicator={false}
      extraData={exploreques}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }


      />
      {
        !isLoading ?
      <TouchableOpacity onPress={()=>setskip(skip+1)}>
        <Text style={{color:'white',alignSelf:'center',marginBottom:10}}>Load more</Text>
      </TouchableOpacity>
      :
      <LoadingScreennew/>
}
      </View>
    </View>
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
    backgroundColor: '#0C0C0C',
    paddingHorizontal:16
  },
  header:{
    marginTop:20
  },
  headerText:{
    fontFamily:'InterSemi',
    color:'white',
    fontSize:22
  }

})
