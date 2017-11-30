import React, { Component } from 'react'
import { Text, View, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
//Utils
import { submitCard } from '../utils/api'
import { white, midnightBlue, silver, clouds } from './../utils/colors'
//Actions
import { addCard } from './../actions'


class AddCard extends Component {
  state = {
    question: null,
    answer: null
  }

  handleAddCard = () => {
    const { deck, addCard, navigation } = this.props
    const { question, answer } = this.state
    submitCard(deck, { question, answer })
    .then(res => {
      addCard(deck, { question, answer })
      navigation.navigate('Deck', { deckId: deck.title })
      this.setState(() => ({
        question: null,
        answer: null
      }))
    })
  }

  handleQuestionInput = question => {
    this.setState(() => ({ question }))
  }

  handleAnswerInput = answer => {
    this.setState(() => ({ answer }))
  }

  render() {
    const { question, answer } = this.state
    const { deck } = this.props
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Add a new question to </Text>
        <Text style={styles.title}>{deck.title} Deck</Text>
        <TextInput
          style={styles.textInput}
          placeholder='Question'
          value={question}
          onChangeText={this.handleQuestionInput}
        />
        <TextInput
          style={styles.textInput}
          placeholder='Answer'
          value={answer}
          onChangeText={this.handleAnswerInput}
        />
        <TouchableOpacity
          style={
            !question || !answer
              ? [styles.addBtn, styles.disabledBtn]
              : styles.addBtn
          }
          onPress={this.handleAddCard}
          disabled={!question || !answer}
        >
          <Text style={styles.btnText}>Submit</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

function mapStateToProps(decks, props) {
  const { deckId } = props.navigation.state.params
  const deck = decks[deckId]
  return {
    deck
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addCard: (deck, card) => dispatch(addCard(deck, card))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCard)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: clouds,
    padding: 10,
    paddingTop: 30
  },
  title: {
    color: midnightBlue,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textInput: {
    alignSelf: 'center',
    borderRadius: 6,
    borderColor: midnightBlue,
    borderWidth: 1,
    padding: 15,
    marginTop: 15,
    width: 300
  },
  addBtn: {
    backgroundColor: midnightBlue,
    padding: 10,
    margin: 15,
    borderRadius: 7,
    height: 45,
    marginLeft: 25,
    marginRight: 25,
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
