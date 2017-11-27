import React, { Component } from 'react'
import { StatusBar, View, Text } from 'react-native'
import { Constants } from 'expo'

// Utils
import { midnightBlue } from './utils/colors'

// Components
import AddCard from './components/AddCard'

function AppStatusBar ({backgroundColor, ...props}) {
   return (
     <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
       <StatusBar translucent backgroundColor={backgroundColor} {...props} />
     </View>
   )
 }

export default class App extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <AppStatusBar backgroundColor={midnightBlue} barStyle="light-content" />
        <AddCard />
      </View>
    );
  }
}


