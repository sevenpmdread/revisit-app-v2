import React, {useState,useContext} from 'react'
import { StyleSheet,View,TouchableOpacity} from 'react-native'
import {Text,Input,Button} from 'react-native-elements'
import Spacer from '../comps/Spacer'
import { Context as AuthContext} from '../context/authContext'
import AuthForm from '../comps/AuthForm'
import NavLink from '../comps/NavLink'
import { NavigationEvents } from 'react-navigation'
import loadingScreen from './loadingScreen'
const SignupScreen = ({navigation}) => {

  const {state,signUp,clearError} = useContext(AuthContext)

  return (
    <View >
    <NavigationEvents onWillFocus={clearError} />
    <AuthForm headerText="Sign Up" errorMessage={state.errorMessage} onSubmit={signUp} submitButtonText="Sign Up"/>
    <NavLink text='Already a member? Sign in' routeName="SignIn"/>
    </View>
  )
}

SignupScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};
export default SignupScreen

const styles = StyleSheet.create({
  link:{
    color:'grey',
    textDecorationLine: 'underline'
  }
})
