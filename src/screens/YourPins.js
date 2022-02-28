import { StyleSheet, Text, View,ScrollView,FlatList } from 'react-native'
import React from 'react'
import { yourpins } from '../dummydata'
import RenderYourPins from '../comps/RenderYourPins'
const YourPins = () => {
  return (
    <View>
    <FlatList
data={yourpins}
renderItem={(item)=>
{
 return <RenderYourPins question={item.item.questiontext}/>}
}
keyExtractor={item => item.questionid}
/>
</View>
  )
}

export default YourPins

const styles = StyleSheet.create({})
