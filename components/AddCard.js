import React, { Component } from 'react'
import { Text, View, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
//Utils
import { submitCard } from '../utils/api'
import { white, midnightBlue, silver } from './../utils/colors'
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
    return (
      <View style={styles.container}>
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
  const deck = decks[props.navigation.state.params.deckId]
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
    backgroundColor: white,
    justifyContent: 'center',
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
