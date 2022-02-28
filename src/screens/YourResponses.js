import { StyleSheet, Text, View,FlatList } from 'react-native'
import React from 'react'
import RenderResponseQuestion from '../comps/RenderResponseQuestion'
import { yourresponses } from '../dummydata'
const YourResponses = () => {
  return (
    <View>
    <FlatList
    data={yourresponses}
    renderItem={(item)=>
    {
     return <RenderResponseQuestion question={item.item.questiontext}/>}
    }
    keyExtractor={item => item.questionid}
    />
    </View>
  )
}

export default YourResponses

const styles = StyleSheet.create({})
