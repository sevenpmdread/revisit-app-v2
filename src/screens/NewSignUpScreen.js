import React,{useState,useContext,useEffect} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    StatusBar,
    Image,
    TextInput,Linking

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
import CheckBox from 'react-native-check-box'
//import * as navigation from '../navigationRef';

const NewSignUpScreen = ({navigation}) => {

  const {state,signUp,clearError} = useContext(AuthContext)
  navigation.addListener('focus', () => {
    clearError()
    setusername('')
    setEmail('')
    setPassword('')
  });
  const [isread, setSelection] = useState(false);

  useEffect(() => {
    //  console.log("I AM CALLED ID USEEFFECT")
      // declare the data fetching function


    }, [])
  const [username,setusername] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [loading,setloading] = useState(false)
  let [fontsLoaded] = useFonts({
    "Intermedium": Inter_500Medium,
    "InterRegular":Inter_400Regular,
    "InterSemi":Inter_600SemiBold
   });
    const { colors } = useTheme();
   // console.log( Dimensions.get("screen"))

    return (

        <View style={styles.footer}>
       <Text style={styles.footerHeading}>Revisit</Text>
        <Text style={styles.bytss}>BY THESURREALSERVICE.COM</Text>

        <View style={styles.footerinput}></View>

        <TextInput
          value={username}
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.detailsinput}
          onChangeText={(newusername)=> setusername(newusername)}
          placeholder="Enter username"
          placeholderTextColor={'grey'}
        />
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
         secureTextEntry={true}
          value={password}
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.detailsinput}
          onChangeText={(newpassword)=> setPassword(newpassword)}
          placeholder="Enter password"
          placeholderTextColor={'grey'}
        />
{state.errorMessage ? (<Text style={{color:'red',opacity:0.8}}>{state.errorMessage}</Text>) : null}
<View style={{flexDirection:'row',alignSelf:'center',padding:24}}>
<Text style={{marginTop:0,color:'white',fontSize:10,opacity:1,alignSelf:"center",textDecorationLine:'underline'}}   onPress={() => Linking.openURL('https://thesurrealservice.com/t-c')}>By checking this you agree to the Terms and Conditions</Text>
<CheckBox
        leftTextStyle={{color:'white',fontFamily:'InterRegular'}}
        checkBoxColor="white"
    style={{flex: 1, padding: 10,backgroundColor:isread ? "black" : "#0c0c0c",marginHorizontal:20,marginLeft:6,marginVertical:6,borderRadius:0,opacity:isread ? 1: 0.6}}
    onClick={()=>{
      setSelection(!isread)
    }}
    isChecked={isread}
    leftText={''}
/>
</View>

    <Button title={loading ? `Signing Up..` : `Sign up`}
    disabled={!isread && !loading}
    onPress={async() => {
      setloading(true)

        await signUp({username,email,password})
        setloading(false)
    }

    }
   // disabled={loading}
    containerStyle={{
    alignSelf:'center',
    width:200,
    paddingBottom:0,
    marginBottom:16,
    marginTop:20,
    borderRadius:100
    }}
    buttonStyle={{backgroundColor:'#1400FF'}}/>
       {/* <Text >Have an account? Sign in</Text> */}
       {/* <NavLink  style={{paddingTop:0,marginTop:0}}text='Already a member? Sign in' routeName="SignIn"/> */}
       <TouchableOpacity onPress={()=>navigation.navigate("SignIn")}>
         <Text style={{paddingTop:20,marginTop:0,color:'white',fontSize:12,opacity:0.6,alignSelf:"center"}}>Already a member? Sign in</Text>
       </TouchableOpacity>
        </View>

    );
};

export default NewSignUpScreen;

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
    fontSize:24,
    padding:0,
    paddingBottom:0,
    marginVertical:0,
    fontFamily:'Intermedium'
  },
  bytss: {
    color:'white',
    opacity:0.65,
    fontSize:12,
    fontFamily:'InterRegular',
    paddingVertical:0,
    //marginVertical:0
  },
  footer: {
      flex:1,
      backgroundColor: '#0C0C0C',
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      borderColor:"#3A3A3A",
      borderWidth:0,
      paddingTop:64,
      paddingBottom:225,
      paddingVertical: 80,
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
