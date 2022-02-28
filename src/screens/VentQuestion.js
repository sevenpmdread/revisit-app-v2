import { StyleSheet, Text, View,FlatList } from 'react-native'
import React from 'react'
import { ventquestions } from '../dummydata'
import RenderVentQuestions from '../comps/RenderVentQuestions'
const VentQuestion = () => {
  return (
    <View>
      <FlatList
      data={ventquestions}
      renderItem={(item)=>
        {
         return <RenderVentQuestions question={item.item.questiontext}/>}
        }
      keyExtractor={item => item.questionid}
      />
    </View>
  )
}

export default VentQuestion

const styles = StyleSheet.create({})
