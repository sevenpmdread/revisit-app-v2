import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const CardSpacer = ({children}) => {
  return (
    <View style={styles.spacer}>
      {children}
    </View>
  )
}

export default CardSpacer

const styles = StyleSheet.create({
  spacer: {
    margin:8
  }
})
