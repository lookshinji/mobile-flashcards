import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
//utils
import { white, midnightBlue, clouds, asbestos, greenSea, silver } from '../utils/colors'

class Deck extends Component {
  render() {
    const { deck, navigation } = this.props
    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.titleText}>{deck.title}</Text>
          <Text style={styles.numberText}>{deck.questions.length} {deck.questions.length === 1 ?
          ' card' : ' cards'}</Text>
        </View>
        <TouchableOpacity
          style={deck.questions.length === 0
            ? [styles.quizBtn, styles.disabledBtn]
            : styles.quizBtn }
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
  const { deckId } = props.navigation.state.params
  return {
    decks,
    deck: decks[deckId]
  }
}

export default connect(mapStateToProps)(Deck)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: clouds,
    paddingTop: 30,
  },
  textContainer: {
    paddingBottom:20,
    alignItems: 'center',
  },
  titleText: {
    color: midnightBlue,
    fontSize: 25,
    fontWeight: 'bold'
  },
  numberText: {
    color: asbestos,
    fontSize: 20
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
