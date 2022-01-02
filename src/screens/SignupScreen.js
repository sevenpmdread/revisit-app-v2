import React, {useState,useContext} from 'react'
import { StyleSheet,View,TouchableOpacity} from 'react-native'
import {Text,Input,Button} from 'react-native-elements'
import Spacer from '../comps/Spacer'
import { Context as AuthContext} from '../context/authContext'
const SignupScreen = ({navigation}) => {

  const {state,signUp} = useContext(AuthContext)
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  return (
    <View style={{alignItems:'center'}}>
      <Spacer>
      <Text h3 > Sign up</Text>
      </Spacer>
      {/* <Text style={{fontSize:48}}>SignupScreen</Text> */}

      <Input
      value={email}
      autoCapitalize="none"
      autoCorrect={false}
      onChangeText={(newEmail)=> setEmail(newEmail)}
      disabledInputStyle={{ background: "#00" }}
      inputStyle={{borderWidth:2, borderColor:'black',padding:12,borderRadius:2.5}}
      placeholder="Enter email"
    />

    <Input
    secureTextEntry
    value={password}
    autoCapitalize="none"
    autoCorrect={false}
    onChangeText={(newPassword)=> setPassword(newPassword)}
    containerStyle={{margin:15}}
    disabledInputStyle={{ background: "#ddd" }}
    inputStyle={{borderWidth:2, borderColor:'black',padding:12,borderRadius:2.5}}
    placeholder="Enter password"
  />

  {state.errorMessage ? (<Text style={{color:'red'}}>{state.errorMessage}</Text>) : null}
  <Spacer/>
    <Button
      buttonStyle={{ width: 150, borderRadius: 0,borderColor:'black',borderWidth:2,alignItems: 'center',backgroundColor:'black' }}
      containerStyle={{ margin: 5 }}
      disabledStyle={{
        borderWidth: 2,
        borderColor: "#00"
      }}
      disabledTitleStyle={{ color: "#00F" }}
      linearGradientProps={null}
      loadingProps={{ animating: true }}
      loadingStyle={{}}
      onPress={() => signUp({email,password})}
      title="Sign up"
      titleProps={{}}
      titleStyle={{ marginHorizontal: 5,color:'white' }}
      type="outline"
    />
    <TouchableOpacity onPress={()=> navigation.navigate('SignIn')}>
    <Spacer/>
      <Text style={styles.link}>Already have an account? Sign in</Text>
    </TouchableOpacity>

    </View>
  )
}

export default SignupScreen

const styles = StyleSheet.create({
  link:{
    color:'grey',
    textDecorationLine: 'underline'
  }
})
