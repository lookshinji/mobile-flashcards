import React, { Component } from 'react'
import { Text, View, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
//Utils
import { submitDeck } from '../utils/api'
import { white, midnightBlue, greenSea, silver, clouds } from './../utils/colors'
//Actions
import { addDeck } from '../actions'

class AddDeck extends Component {
  state = {
    input: null
  }

  handleAddDeck = () => {
    const { addDeck, navigation } = this.props
    const { input } = this.state
    submitDeck(input)
      .then(res => {
        addDeck(input)
        navigation.navigate('Deck', { deckId: input })
        this.setState(() => ({
          input: null
        }))
    })
  }

  handleTextInput = input => {
    this.setState(() => ({
      input
    }))
  }

  render() {
    const { input } = this.state
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Create here your Deck!</Text>
        <TextInput
          style={styles.textInput}
          value={input}
          placeholder='Deck Title'
          onChangeText={this.handleTextInput}
        />
        <TouchableOpacity
          style={!input ? [styles.addBtn, styles.disabledBtn] : styles.addBtn}
          onPress={this.handleAddDeck}
          disabled={!input}
        >
          <Text style={styles.btnText}>Add Deck</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

function mapStateToProps(decks, props) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    addDeck: data => dispatch(addDeck(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddDeck)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: clouds,
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
