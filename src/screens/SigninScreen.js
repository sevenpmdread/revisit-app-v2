import React,{useContext} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Context as AuthContext } from '../context/authContext'
import AuthForm from '../comps/AuthForm'
import NavLink from '../comps/NavLink'
import { NavigationEvents } from 'react-navigation'
const SigninScreen = () => {
  const {state,signin,clearError} = useContext(AuthContext)

  return (
    <View style={{paddingTop:48}}>
    <NavigationEvents onWillFocus={clearError} />
    <AuthForm headerText="Sign In" errorMessage={state.errorMessage} onSubmit={signin} submitButtonText="Sign In"/>
    <NavLink text='New to the app? Sign Up' routeName="SignUp"/>
    </View>
  )
}
SigninScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

export default SigninScreen

const styles = StyleSheet.create({
  link:{
    color:'grey',
    textDecorationLine: 'underline'
  }
})
