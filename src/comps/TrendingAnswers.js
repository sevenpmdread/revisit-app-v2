import { StyleSheet, Text, View,ToastAndroid } from 'react-native'
import React, { useEffect,useState } from 'react'
import { useFonts, Inter_500Medium,Inter_400Regular,Inter_600SemiBold} from '@expo-google-fonts/inter';
import Carousel from 'react-native-snap-carousel';
import { getrending } from '../context/restapi';
import LoadingScreennew from '../screens/Loadingnew';
import TimeAgo from 'react-native-timeago';
import { BottomSheet, ListItem } from 'react-native-elements';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ShareableImageCard from './ShareableImageCard';
import { Entypo } from '@expo/vector-icons';
import { getCount,checkpinstatus,sharepost,unpinPost,pinpost } from '../context/restapi';
import { ColorPicker } from "react-native-btr";
import RenderItem from './RenderTrendingAnswers';
const TrendingAnswers = ({onpress}) => {
  const [sharecount,setsharecount] = useState()
  const [pincount,setpinscount] = useState()
  const [pinned,setpin] = useState(false)
  const [ispinLoading,setpinLoading] = useState(false)
  const [isLoading,setloading] = useState(false)
  let [fontsLoaded] = useFonts({
    "Intermedium": Inter_500Medium,
    "InterRegular":Inter_400Regular,
    "InterSemi":Inter_600SemiBold
   });
  const [activeIndex,setActiveIndex] = useState(0)
  const [carouselItems,setcarouselItems] = useState([])

  useEffect(() => {

   const  fetchHome = async() => {
    const trending = await getrending()
    setcarouselItems(trending)

    setloading(false)
    //console.log("TRENDING array",carouselItems)

   }
    setloading(true)
    fetchHome()

   },[])

  return (
    <View>
      <Text style={{fontFamily:'Intermedium',fontSize:20,color:'white',paddingVertical:24,opacity:0.8,paddingLeft:6}}>Trending Answers ✨</Text>
      <View style={{ flex: 1, flexDirection:'row', justifyContent: 'center', }}>
        {
          isLoading ?
          <LoadingScreennew/>
          :
          <Carousel
          layout={"default"}
        //  ref={ref => carousel = ref}
          data={carouselItems}
          sliderWidth={200}
          itemWidth={380}
          renderItem={(item,index) => <RenderItem item={item.item} index={index} onpress={onpress}/>}
          onSnapToItem = { index => setActiveIndex(index) } />
        }

            </View>
    </View>
  )
}

export default TrendingAnswers

const styles = StyleSheet.create({
  questionrow: {
    paddingTop:20,
    flexDirection:'row',
    paddingBottom:12

  }
})
