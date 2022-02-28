import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  StatusBar,
  FlatList,
  Image,
  ImageBackground,Button,
  SafeAreaView, ScrollView,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import {Entypo} from '@expo/vector-icons'
import { Card, withTheme } from 'react-native-elements';
import NavLink from '../comps/NavLink'
import { useFonts, Inter_500Medium,Inter_400Regular,Inter_600SemiBold} from '@expo-google-fonts/inter';
import { fonts } from 'react-native-elements/dist/config';
import Questionofday from '../comps/Questionofday';
import CategoryQuestion from '../comps/CategoryQuestions';
//import { quesdescs } from '../dummydata';
import CardSpacer from '../comps/CardSpacer';
import Categoryfeed from '../comps/CategoryPagefeed';

const CategoryScreen = ({navigation}) => {


  const quesdescs = [
    {
      type:'Existential',
      desc:'What is the nature of your reality? Dismantle what you find meaningful in this universe one response at a time.',
      src:'../../assets/categoryexistential.png'
    },
  ]
  let [fontsLoaded] = useFonts({
    "Intermedium": Inter_500Medium,
    "InterRegular":Inter_400Regular,
    "InterSemi":Inter_600SemiBold
   });
  // console.log(fontsLoaded)
  const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;
  return (
    <ScrollView  style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
    <View style={styles.container}>
    <View style={styles.header}>
    </View>
    <CardSpacer/>
    <FlatList
    data={quesdescs}
    renderItem={(item)=>
      {//console.log(item)
    console.log("navigation -> ",navigation)
     return <Categoryfeed navigation={navigation} type={item.item.type} desc={item.item.desc} imagesrc={item.item.src}/>}
     }
    keyExtractor={item => item.type}
    />
    {/* <CategoryQuestion type='Existential'/>
    <CategoryQuestion type='Confrontational'/> */}


    </View>
    </ScrollView>
  );
};
CategoryScreen.navigationOptions = () => {
  return {
    headerShown: true,
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
    backgroundColor: '#121212',
    paddingHorizontal:16
  },
  header:{
    paddingTop:56,
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
