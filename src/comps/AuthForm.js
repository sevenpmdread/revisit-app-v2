import React,{useState} from 'react'
import {  View,TouchableOpacity,
  Dimensions,
  StyleSheet,
  StatusBar,
  Image, } from 'react-native'
import { Text,Button,Input } from 'react-native-elements'
import Spacer from './Spacer'
const AuthForm = ({headerText,errorMessage,onSubmit,submitButtonText}) => {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  return (
    <View style={{alignItems:'center',padding:12}}>
     <Spacer>
      <Text h4>{headerText}</Text>
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

  {errorMessage ? (<Text style={{color:'red'}}>{errorMessage}</Text>) : null}
  <Spacer/>
    <Button
      buttonStyle={{ width: 120, borderRadius: 0,borderColor:'black',borderWidth:2,alignItems: 'center',backgroundColor:'black' }}
      containerStyle={{ margin: 5 }}
      disabledStyle={{
        borderWidth: 2,
        borderColor: "#00"
      }}
      disabledTitleStyle={{ color: "#00F" }}
      linearGradientProps={null}
      loadingProps={{ animating: true }}
      loadingStyle={{}}
      onPress={() => onSubmit({email,password})}
      title={submitButtonText}
      titleProps={{}}
      titleStyle={{ marginHorizontal: 5,color:'white' }}
      type="outline"
    />
    </View>
  )
}

export default AuthForm

const styles = StyleSheet.create({})
