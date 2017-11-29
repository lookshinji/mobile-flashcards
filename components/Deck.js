import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
//utils
import { white, midnightBlue, asbestos, greenSea, silver } from '../utils/colors'

class Deck extends Component {
  render() {
    const { deck, navigation } = this.props
    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.titleText}>{deck.title}</Text>
          <Text style={{color: asbestos, fontSize: 20}}>{deck.questions.length} {deck.questions.length === 1 ?
          ' card' : ' cards'}</Text>
        </View>
        <TouchableOpacity
          style={deck.questions.length === 0
            ? [styles.quizBtn, styles.disabledBtn]
            : styles.addBtn }
          disabled={deck.questions.length === 0 ? true : false}
          onPress={() =>
            navigation.navigate('Quiz', { deckId: deck.title })
          }>
          <Text style={styles.btnText}>Start Quiz</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() =>
            navigation.navigate('AddCard', { deckId: deck.title })
          }>
          <Text style={styles.btnText}>Add Question</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

function mapStateToProps(decks, props) {
  return {
    decks,
    deck: decks[props.navigation.state.params.deckId]
  }
}

export default connect(mapStateToProps)(Deck)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    justifyContent: 'center',
  },
  textContainer: {
    padding:20,
    alignItems: 'center',
  },
  titleText: {
    color: midnightBlue,
    fontSize: 25,
    fontWeight: 'bold'
  },
  quizBtn: {
    backgroundColor: greenSea,
    padding:10,
    margin: 5,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },
  addBtn: {
    backgroundColor: midnightBlue,
    padding:10,
    margin: 5,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },
  disabledBtn: {
    backgroundColor: silver
  },
  btnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  },
})
