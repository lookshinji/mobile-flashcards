import React, { Component } from 'react'
import { AsyncStorage, Text, View, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
//Utils
import { fetchDecks } from '../utils/api'
import { white, midnightBlue, greenSea, silver } from '../utils/colors'
//Actions
import { getDecks } from '../actions'
//Components
import Deck from '../components/Deck'

class DeckList extends Component {
  componentDidMount = () => {
    const { getDecks } = this.props
    fetchDecks()
    .then(decks => {
      getDecks(decks)
    })
  }

  _renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.item}
        key={item.title}
        onPress={() =>
          this.props.navigation.navigate('Deck', { deckId: item.title })
        }
      >
        <View style={styles.deckContainer}>
          <View style={{flex:1, flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{flex:1}}>{item.title}</Text>
            <Text style={{flex:1}}>{item.questions.length} {item.questions.length === 1 ?
            ' card' : ' cards'}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    const { decks } = this.props
    return (
      <View style={{flex: 1}}>
        <FlatList
          data={decks}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => {
            return item.title
          }}
        />
      </View>
    )
  }
}

function mapStateToProps(data) {
  let decks = []
  Object.keys(data).map((key, index) => {
    let deck = data[key]
    decks.push(deck)
  })

  return {
    decks
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getDecks: data => dispatch(getDecks(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckList)

const styles = StyleSheet.create({
  deckContainer: {
    flex:1,
    padding: 15,
    margin: 15,
    borderRadius: 6,
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: white
  },
  item: {
    flex: 1,
    alignItems: 'center',
  },
})
