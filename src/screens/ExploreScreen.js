import { StyleSheet, Text, View,Image,FlatList } from 'react-native'
import React from 'react'
import { Card } from 'react-native-elements';
import { useFonts, Inter_500Medium,Inter_400Regular,Inter_600SemiBold} from '@expo-google-fonts/inter';
import { categoryquestions } from '../dummydata';
import RenderExploreFeed from '../comps/RenderExploreFeed';
import { ScrollView } from 'react-native-gesture-handler';
//import RenderCategoryfeed from '../comps/RenderCategoryfeed';
const ExploreScreen = ({navigation}) => {

  let [fontsLoaded] = useFonts({
    "Intermedium": Inter_500Medium,
    "InterRegular":Inter_400Regular,
    "InterSemi":Inter_600SemiBold
   });
  return (
    <ScrollView>
    <View style={styles.container}>
      <View style={styles.header}>
      <Text style={styles.headerText}>EXPLORE</Text>
      </View>
      <View>
        <Card containerStyle={styles.discoverCard}>
        <View style={{flexDirection:'row',}}>
        <Image  source={require('../../assets/ventvector.png')} containerStyle={{marginTop:30}} imageStyle={{marginTop:12}} resizeMode='contain'/>
        <View style={styles.textArea}>
          <Text style={{fontFamily:'InterSemi',color:'white',fontSize:16}}>Discover new questions!</Text>
          <Text  style={{fontFamily:'InterRegular',color:'white',fontSize:12,opacity:0.7,width:200}}>You can use this part of the app to find out questions that are constantly being interacted with, pin answers you like, share them or chose to answer them yourselves!</Text>
        </View>
        </View>
        </Card>
      </View>
      <View>
      <FlatList
     contentContainerStyle={{marginLeft:8}}
    //  horizontal={true}
      style={styles.feed}
       data = {categoryquestions}
     // scrollEventThrottle={16}
   //   snapToInterval={400}
      snapToAlignment ="start"
          decelerationRate={0}
          bounces={true}
          // onScrollBeginDrag={()=>
          // Animated.event([{nativeEvent: {contentOffset:{x:scrollX}}}],
          // {useNativeDriver:true})}
      renderItem={(item)=>
       {//console.log(item)
      return <RenderExploreFeed navigation={navigation} post={item}/>}
      }
      keyExtractor={item => item.question_id}
      showsVerticalScrollIndicator={false}
      />
      </View>
    </View>
    </ScrollView>
  )
}

export default ExploreScreen

const styles = StyleSheet.create({
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
    backgroundColor: '#101010',
    paddingHorizontal:16
  },
  header:{
    marginTop:60
  },
  headerText:{
    fontFamily:'InterSemi',
    color:'white',
    fontSize:22
  }

})
