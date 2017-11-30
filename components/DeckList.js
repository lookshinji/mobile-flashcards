import React, { Component } from 'react'
import { AsyncStorage, Text, View, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
//Utils
import { fetchDecks } from '../utils/api'
import { white, midnightBlue, greenSea, silver, clouds } from '../utils/colors'
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
    const { navigation } = this.props
    return (
      <TouchableOpacity
        style={styles.item}
        key={item.title}
        onPress={() =>
          navigation.navigate('Deck', { deckId: item.title })
        }
      >
        <View style={styles.deckContainer}>
          <View style={styles.deckRow}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemNumber}>{item.questions.length} {item.questions.length === 1 ?
            ' card' : ' cards'}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    const { decks } = this.props
    return (
      <View style={styles.container}>
        <Text style={styles.title}>FlashCards</Text>
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
  container: {
    flex:1,
    backgroundColor: clouds,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: midnightBlue,
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 10
  },
  deckContainer: {
    flex:1,
    padding: 25,
    margin: 5,
    borderRadius: 6,
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  deckRow: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  item: {
    flex: 1,
    alignItems: 'center',
  },
  itemTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: midnightBlue,
  },
  itemNumber: {
    flex:1,
    textAlign: 'right',
    color: greenSea,
    fontSize: 16,
    fontWeight: 'bold'
  }
})
