import React from 'react'
import { View, ScrollView, StyleSheet, Image,TouchableOpacity,FlatList,TouchableHighlight } from 'react-native';
import { Text, Card, Button, Icon } from 'react-native-elements';
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { categoryanswers } from '../dummydata';
//import { useFonts, Inter_500Medium,Inter_400Regular} from '@expo-google-fonts/inter';
import posts from '../dummydata';
import RenderCategoryAnswers from './RenderCategoryAnswers';
import CategoryDrillScreen from './CategoryDrillScreen';
const RenderCategoryfeed = ({post,navigation}) => {
  // let [fontsLoaded] = useFonts({
  //   "Intermedium": Inter_500Medium,
  //   "InterRegular":Inter_400Regular
  //  });
  console.log(navigation)
   return post.item.type !== "more" ?  (
    <View >
            <Card containerStyle={{marginVertical:0,marginBottom:2,marginHorizontal:0,backgroundColor:'transparent',borderWidth:0,borderColor:'rgba(255, 255, 255, 0.4)',paddingBottom:2,dispplay:'flex',flexGrow:2,flexDirection:'column'}}>
            <View>
            <TouchableOpacity onPress={()=>navigation.navigate("CategoryDrill",{
              post:post
            })}>
            <Text style={styles.questionText}>{post.item.question_text}</Text>
            </TouchableOpacity>
            </View>
            </Card>

            <View style={styles.questionrow}>
            <TouchableOpacity
            activeOpacity={.7}
            tvParallaxProperties={{enabled:false}}
            style={styles.button}

      >
        <Text> Answer</Text>
      </TouchableOpacity>
                <TouchableOpacity >
                <Feather name="more-vertical" size={26} color="white" style={{marginTop:12,textAlign:'left',opacity:0.7}}/>
                </TouchableOpacity >
            </View>
            <FlatList
     contentContainerStyle={{marginLeft:8}}
      horizontal={true}
      style={styles.feed}
       data = {categoryanswers}
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
      return <RenderCategoryAnswers post={item}/>}
      }
      keyExtractor={item => item.answer_id}
      showsVerticalScrollIndicator={false}
      />
    </View>
  ) : (
    <View >
    <View>
    <TouchableOpacity>
    <Text style={styles.readmore}>Load more</Text>
    </TouchableOpacity>
    </View>

</View>
  )
};

export default RenderCategoryfeed;

const styles = StyleSheet.create({
  button:{
    backgroundColor:'white',
    marginTop:0,
    //opacity:0.6,
    height:32,
    width:100,
    padding:4,
    color:"black",
    elevation:5,
   // width:100,
   // height:20,
    borderRadius:5,
    alignContent:'center',
    alignItems:'center',
    marginBottom:32

  },
  cardfooter: {
    fontSize:10,
    paddingTop:3,
   // paddingRight:26,
    paddingLeft:36,
   opacity:0.6,
    color:'white',
  // fontFamily:'InterRegular'
  },
  iconstyle: {
    marginRight:20,
    textAlign:'center'
  },
  questionText:{
    fontFamily:'Intermedium',
    fontStyle: 'normal',
   // overflow:'ellipsis',
    fontSize: 22,
    opacity:0.9,
   // paddingBottom:24,
    color:'white',

  },
  readmore:{
    fontFamily:'InterRegular',
    fontStyle: 'normal',
    textDecorationLine:"underline",
     fontSize: 24,
   //  paddingTop:110,
     paddingHorizontal:16,
    // textAlignVertical:'center',
     textAlign:'center',
     opacity:0.8,
    // paddingBottom:24,
     color:'white',

   },
  questionrow: {
    justifyContent:'space-between',
    display:'flex',
    flex:2,
   alignContent:'flex-end',
   textAlign:'justify',
   alignItems:'baseline',
    textAlignVertical:'bottom',
    flexDirection:'column',
    marginTop:0,
    paddingLeft:16,
    //paddingTop:30,
    paddingBottom:5,
   marginBottom:1,
    flexDirection:'row',
  },
});
