import React, {useState} from 'react';
import { Animated, View, TouchableOpacity, StyleSheet } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import Constants from 'expo-constants';
import { useFonts, Inter_500Medium,Inter_400Regular,Inter_600SemiBold} from '@expo-google-fonts/inter';
import YourPins from './YourPins';
import YourResponses from './YourResponses';
const FirstRoute = () => (
  <YourResponses/>
);
const SecondRoute = () => (
  <YourPins/>
);



export default class NavSwap extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'responses', title: 'Your responses' },
      { key: 'pins', title: 'Your pins' },
    ],
  };

  _handleIndexChange = (index) => this.setState({ index });

  _renderTabBar = (props) => {
    const inputRange = props.navigationState.routes.map((x, i) => i);

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
                marginHorizontal:24,
                borderBottomLeftRadius:2,
                borderBottomRightRadius:2,

              borderBottomWidth:4}}
              onPress={() => this.setState({ index: i })}>
              <Animated.Text style={{ opacity,color:'white' }}>{route.title}</Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  _renderScene = SceneMap({
    responses: FirstRoute,
    pins: SecondRoute,
  });

  render() {
    return (
      <TabView
        navigationState={this.state}
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
    backgroundColor:'#101010',
    color:'white',
  // paddingTop: Constants.statusBarHeight,
  },
  tabItem: {

  },
});
