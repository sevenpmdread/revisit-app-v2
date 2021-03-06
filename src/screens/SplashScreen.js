import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    StatusBar,
    Image,Linking

} from 'react-native';
import NavLink from '../comps/NavLink'

import { Button, ButtonGroup, withTheme } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
//import * as navigation from '../navigationRef';

const SplashScreen = ({navigation}) => {
  // navigation =  navigation.getParam('navigation')
   //console.log("NAVIGATION",navigation)
    const { colors } = useTheme();
   // console.log( Dimensions.get("screen"))

    return (
      <View style={styles.container}>
        <View style={styles.header}>
        <Image resizeMode='contain' source={require('../../assets/smalloneasset.png')}/>
          </View>
        <View style={styles.footer}>
       <Text style={styles.footerHeading}>Revisit</Text>
        <Text style={styles.bytss} onPress={() => Linking.openURL('https://thesurrealservice.com')}>by thesurrealservice.com</Text>
        <Text style={styles.subText}>Build to confront, discover yourself by revisiting your ideas,beliefs and more</Text>
        <Button title="Get started for free"
        onPress={()=> navigation.navigate('SignUp')}
        containerStyle={{
                //  width: 200,
                 // marginHorizontal: 10,
                // /  marginVertical: 10,
                paddingBottom:0,
                marginBottom:0,
                  marginTop:24,
                  borderRadius:100
                }} buttonStyle={{backgroundColor:'#1400FF'}}/>
       {/* <Text >Have an account? Sign in</Text> */}
       {/* <NavLink  style={{paddingTop:0,marginTop:0}}text='Already a member? Sign in' routeName="SignIn"/> */}
       <TouchableOpacity onPress={()=>navigation.navigate("SignIn")}>
         <Text style={{paddingTop:16,marginTop:0,color:'white',fontSize:12,opacity:0.6,textDecorationLine:"underline",alignSelf:'center'}}>Already a member? Sign in</Text>
       </TouchableOpacity>
        </View>
      </View>
    );
};

SplashScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};
export default SplashScreen;

const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212'
  },
  image: {
    alignItems:'flex-end',
    alignSelf:'flex-end',
    display:'flex',
    width: 170,
    height: 170,
    zIndex: 1000,
    marginTop:400,
    position:'absolute',
  //  elevation:5,
   // marginRight: 10,
  },
  header: {
      flex: 2,
      marginTop:200,
      justifyContent: 'center',
      alignItems: 'center'
  },
  bottomSignIn: {
    color:'white',
    opacity:0.60,
    fontSize:12,
    alignItems:'center',
    textAlign:'center',
    paddingTop:6,
  },
  subText:{
    color:'white',
    opacity:0.60,
    fontSize:12,
    paddingTop:12,
    //marginVertical:0
  },
  footerHeading: {
    display:'flex',
    color:'white',
    opacity:0.95,
    fontSize:48,
    padding:0,
    paddingBottom:0,
    marginVertical:0
  },
  bytss: {
    color:'white',
    opacity:0.65,
    fontSize:14,
    textDecorationLine:'underline'
    //paddingVertical:0,
    //marginVertical:0
  },
  footer: {
      flex: 1,
      backgroundColor: '#222222',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      borderColor:"#3A3A3A",
      borderWidth:2,
      borderBottomWidth:0,
      paddingTop:16,
      paddingBottom:125,
    //  paddingVertical: 80,
      paddingHorizontal: 30
  },
  logo: {
      width: height_logo,
      height: height_logo
  },
  title: {
      color: '#05375a',
      fontSize: 30,
      fontWeight: 'bold'
  },
  text: {
      color: 'grey',
      marginTop:5
  },
  button: {
      alignItems: 'flex-end',
      marginTop: 30
  },
  signIn: {
      width: 150,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
      flexDirection: 'row'
  },
  textSign: {
      color: 'white',
      fontWeight: 'bold'
  }
});
