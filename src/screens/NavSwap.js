import React, {useState} from 'react';
import { Animated, View, TouchableOpacity, StyleSheet } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { useFonts, Inter_500Medium,Inter_400Regular,Inter_600SemiBold} from '@expo-google-fonts/inter';
import YourPins from './YourPins';
import YourResponses from './YourResponses';
import { ScrollView } from 'react-native-gesture-handler';
import YourReminders from './YourReminders';
const FirstRoute = (navigation) => (
  <ScrollView style={{marginBottom:60,backgroundColor:'#0C0C0C'}} nestedScrollEnabled={true}>
  <YourResponses  navigation={navigation}/>
  </ScrollView>
);
const SecondRoute = (navigation) => (
<ScrollView style={{marginBottom:60,backgroundColor:'#0C0C0C'}} nestedScrollEnabled={true}>
  <YourPins  navigation={navigation}/>
  </ScrollView>
);
const ThirdRoute = (navigation) => (
  <YourReminders navigation={navigation}/>
);



export default class NavSwap extends React.Component {

  state = {
    index: 0,
    routes: [
      { key: 'responses', title: 'Responses' },
      { key: 'pins', title: 'Pins' },
      { key: 'reminders', title: 'Reminders' },
    ],
  };

  _handleIndexChange = (index) => this.setState({ index });



  _renderTabBar = (props) => {
    let [fontsLoaded] = useFonts({
      "Intermedium": Inter_500Medium,
      "InterRegular":Inter_400Regular,
      "InterSemi":Inter_600SemiBold
     });
    const inputRange = props.navigationState.routes.map((x, i) => i);
   // console.log("fhsgdfjhsdgfhsdgfsdf",props.navigation)
    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map((inputIndex) =>
              inputIndex === i ? 1 : 0.5
            ),
          });

          return (
            <TouchableOpacity
           //   style={styles.tabItem}
              style={{ flex: 1,
                alignItems: 'center',
                padding: 16,
                borderBottomColor: this.state.index === i ? 'white' : 'transparent',
                marginHorizontal:12,
                borderBottomLeftRadius:2,
                borderBottomRightRadius:2,

              borderBottomWidth:4}}
              onPress={() => this.setState({ index: i })}>
              <Animated.Text style={{ opacity,color:'white',fontFamily:'InterRegular',fontSize:12 }}>{route.title}</Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  _renderScene = SceneMap({
    responses: ()=>{
      return FirstRoute(this.props.navigation)
    },
    pins: ()=>{
      return SecondRoute(this.props.navigation)
    },
    reminders: ()=>{
    //  console.log("this.props",this.props)
      return ThirdRoute(this.props.navigation)
    },
  });

  render() {
    console.log("THIS PROPS",this.props.navigation)
    return (
      <TabView
        navigationState={this.state}
        navigation = {this.props.navigation}
        renderScene={this._renderScene}
        renderTabBar={this._renderTabBar}
        onIndexChange={this._handleIndexChange}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'yellow'
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor:'#0C0C0C',
    color:'white',
  // paddingTop: Constants.statusBarHeight,
  },
  tabItem: {

  },
});
