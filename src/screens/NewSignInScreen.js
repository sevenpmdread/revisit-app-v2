import React,{useState,useContext} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    StatusBar,
    Image,
    TextInput,

} from 'react-native';
import NavLink from '../comps/NavLink'
import { useFonts, Inter_500Medium,Inter_400Regular,Inter_600SemiBold} from '@expo-google-fonts/inter';
import { Button, ButtonGroup, Input, withTheme } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Context as AuthContext} from '../context/authContext'
import { NavigationEvents } from 'react-navigation'

const NewSignInScreen = ({navigation}) => {
  const {state,signin,clearError} = useContext(AuthContext)
  const [username,setusername] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  let [fontsLoaded] = useFonts({
    "Intermedium": Inter_500Medium,
    "InterRegular":Inter_400Regular,
    "InterSemi":Inter_600SemiBold
   });
    const { colors } = useTheme();
   // console.log( Dimensions.get("screen"))

    return (

      <View style={styles.container}>
            <NavigationEvents onWillFocus={clearError} />
        <View style={styles.header}>
        <Image source={require('../../assets/smalloneasset.png')}/>
          </View>
        {/* <Image style={styles.image} resizeMode="cover" source={require('../../assets/logo.png')}/> */}
        <View style={styles.footer}>
       <Text style={styles.footerHeading}>Revisit</Text>
        <Text style={styles.bytss}>by the surreal service</Text>

        <View style={styles.footerinput}></View>
        <TextInput
          value={email}
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.detailsinput}
          onChangeText={(newemail)=> setEmail(newemail)}
          placeholder="Enter email"
          placeholderTextColor={'grey'}
        />
         <TextInput
          value={password}
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.detailsinput}
          onChangeText={(newpassword)=> setPassword(newpassword)}
          placeholder="Enter password"
          placeholderTextColor={'grey'}
        />

{state.errorMessage ? (<Text style={{color:'red'}}>{state.errorMessage}</Text>) : null}

    <Button title="SignIn"
    onPress={()=>signin({email,password})}
    containerStyle={{
    alignSelf:'center',
    width:200,
    paddingBottom:0,
    marginBottom:16,
    marginTop:120,
    borderRadius:100
    }}
    buttonStyle={{backgroundColor:'#1400FF'}}/>
       {/* <Text >Have an account? Sign in</Text> */}
       <NavLink  style={{paddingTop:0,marginTop:0}}text='New to the app? Register here' routeName="SignUp"/>
        </View>
      </View>

    );
};
NewSignInScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

export default NewSignInScreen;

const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  detailsinput:{
      height: 60,
      margin:0,
      marginHorizontal:0,
      marginVertical:8,
      fontFamily:'InterRegular',
      fontSize:16,
      margin: 12,
      borderWidth:2,
      color:"white",
     // opacity:0.9,
      borderColor:'#383838',
      borderRadius:6,
      paddingLeft:24,
      //borderBottomColor:'#383838',
     // borderWidth: 2,
      padding: 10,
  },
  footerinput:{
    paddingTop:20
  },
  container: {
    flex: 1,
    backgroundColor: '#121212'
  },
  image: {
    alignItems:'flex-end',
    alignSelf:'flex-end',
    display:'flex',
    width: 180,
    height: 180,
    zIndex: 1000,
    marginTop:475,
    position:'absolute',
  //  elevation:5,
   // marginRight: 10,
  },
  header: {
      flex: 1,
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
    opacity:0.85,
    fontSize:32,
    padding:0,
    paddingBottom:0,
    marginVertical:0,
    fontFamily:'Intermedium'
  },
  bytss: {
    color:'white',
    opacity:0.75,
    fontSize:18,
    fontFamily:'InterRegular',
    paddingVertical:0,
    //marginVertical:0
  },
  footer: {
      flex: 16,
      backgroundColor: '#222222',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      borderColor:"#3A3A3A",
      borderWidth:2,
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
