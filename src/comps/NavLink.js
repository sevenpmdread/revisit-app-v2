import React from 'react'
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import Spacer from './Spacer'
import { withNavigation } from 'react-navigation'
const NavLink = ({navigation,text,routeName}) => {
  return (
    <TouchableOpacity style={{alignItems:'center',padding:0}}onPress={()=> navigation.navigate(routeName)}>
    <Spacer/>
    <Text style={styles.link}>{text}</Text>
    </TouchableOpacity>
  )
}

export default withNavigation(NavLink)

const styles = StyleSheet.create({
  link:{
    paddingTop:0,
    marginTop:0,
    color:'white',
    opacity:0.6,
    textDecorationLine: 'underline'
  }
})

