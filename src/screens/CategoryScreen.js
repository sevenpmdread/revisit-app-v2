import React from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  StatusBar,
  FlatList,
ScrollView,
} from 'react-native';

import { useFonts, Inter_500Medium,Inter_400Regular,Inter_600SemiBold} from '@expo-google-fonts/inter';

import CardSpacer from '../comps/CardSpacer';
import Categoryfeed from '../comps/CategoryPagefeed';
import * as navigation from '../navigationRef'
const CategoryScreen = ({route,navigation}) => {
  let quesdescs = []
  let obj = {}
  obj.type = route.params?.type
  obj.desc =route.params?.desc
  obj.questions = route.params?.questions
  quesdescs.push(obj)
  // const quesdescs = [
  //   {
  //     type:'Existential',
  //     desc:'What is the nature of your reality? Dismantle what you find meaningful in this universe one response at a time.',
  //     src:'../../assets/categoryexistential.png'
  //   },
  // ]
  let [fontsLoaded] = useFonts({
    "Intermedium": Inter_500Medium,
    "InterRegular":Inter_400Regular,
    "InterSemi":Inter_600SemiBold
   });
  return (
    <ScrollView>
    <View style={styles.container}>
    <View style={styles.header}>
    </View>
    <CardSpacer/>
    <Categoryfeed navigation={navigation} type={obj.type} desc={obj.desc} questions={obj.questions} />
    </View>
    </ScrollView>
  );
};
CategoryScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

export default CategoryScreen;



const styles = StyleSheet.create({
  button:{
    backgroundColor:'white',
    marginTop:16,
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
  qod:{
    color:'white',
    fontSize:12,
    opacity:0.8,
    marginBottom:6,
  //  fontFamily:'InterRegular'
  },
  container: {
    flex: 1,
    backgroundColor: '#0C0C0C',
    paddingHorizontal:16
  },
  header:{
    paddingTop:0,
    paddingBottom:16,
    alignItems:"flex-start",
    flexDirection:'row',
    justifyContent:'space-between',
    //paddingLeft:16,
   // paddingRight:16,
  },
  headerTitle:{
    color:'white',
    fontSize:24,
  //  fontFamily:'Intermedium',

  },
  card:{
    borderWidth:4,
    borderColor:'black',
    backgroundColor:'black'
  },
  questionText:{
    fontStyle: 'normal',
    fontSize: 28,
   //fontFamily:'Intermedium',
    color:'white',
    alignContent:'center',
    justifyContent:'center',
    display:'flex',
    opacity:1

  },
  questionrow: {
    paddingTop:20,
    flexDirection:'row',
    paddingBottom:12

  },
})
