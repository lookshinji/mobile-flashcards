import React, { Component } from 'react'
import { StatusBar, View, Platform } from 'react-native'
import { TabNavigator, StackNavigator, NavigationActions } from 'react-navigation'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { Constants } from 'expo'
// Utils
import { setLocalNotification } from './utils/notifications'
import { midnightBlue, greenSea, white } from './utils/colors'
import { MaterialCommunityIcons } from "@expo/vector-icons";
// Components
import DeckList from './components/DeckList'
import Deck from './components/Deck'
import AddDeck from './components/AddDeck'
import AddCard from './components/AddCard'
import Quiz from './components/Quiz'
// Reducer
import reducer from './reducers'

function AppStatusBar ({backgroundColor, ...props}) {
   return (
     <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
       <StatusBar translucent backgroundColor={backgroundColor} {...props} />
     </View>
   )
 }

export default class App extends Component {
  componentDidMount(){
    setLocalNotification()
  }

  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
          <AppStatusBar backgroundColor={midnightBlue} barStyle="light-content" />
          <TabsNav />
        </View>
      </Provider>
    );
  }
}

const StackNav = StackNavigator(
  {
    DeckList: {
      screen: DeckList,
      navigationOptions: {
        headerTitle: 'FlashCards - Decks',
      },
    },
    Deck: {
      screen: Deck,
      navigationOptions: ({ navigation }) => ({
        title: `${navigation.state.params.deckId}`
      })
    },
    Quiz: {
      screen: Quiz,
      navigationOptions: ({ navigation }) => ({
        title: `${navigation.state.params.deckId} Quiz`
      })
    },
    AddCard: {
      screen: AddCard,
      navigationOptions: {
        title: 'New Question'
      },
    }
  },
  {
    navigationOptions: {
      headerTitleStyle: {
        color: midnightBlue,
      },
      headerTintColor: greenSea,
      headerBackTitleStyle: {
        color: greenSea,
      }
    },
})

const TabsNav = TabNavigator(
  {
    Home: {
      screen: StackNav,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: 'Decks',
        tabBarIcon: ({ tintColor }) => (
          <MaterialCommunityIcons name='cards-outline' size={30} color={tintColor} />
        ),
        tabBarOnPress: (tab, jumpToIndex) => {
          navigation.dispatch(NavigationActions.reset({
            index: 0,
            key: navigation.state.key,
            actions: [NavigationActions.navigate({ routeName: 'DeckList' })],
          }))
        },
      }),
    },
    AddDeck: {
      screen: AddDeck,
      navigationOptions: {
        headerTitle: 'Add Deck',
        tabBarLabel: 'Add Deck',
        tabBarIcon: ({ tintColor }) => (
          <MaterialCommunityIcons name='plus-circle-outline' size={30} color={tintColor} />
        )
      }
    }
  },
  {
    navigationOptions: {
      headerTitleStyle: {
        color: midnightBlue,
      },
    },
    tabBarOptions: {
      animationEnabled: true,
      activeTintColor: Platform.OS === 'ios' ? midnightBlue : white,
      style: {
        height: 56,
        backgroundColor: Platform.OS === 'ios' ? white : midnightBlue,
        shadowColor: "rgba(0, 0, 0, 0.24)",
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      }
    }
  }
)
