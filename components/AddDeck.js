import React, { Component } from 'react'
import { Text, View, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import { white, midnightBlue, asbestos, greenSea, silver } from './../utils/colors'

class AddDeck extends Component {
  state = {
    input: null
  }
  
  handleTextInput = input => {
    this.setState(() => ({
      input
    }))
  }
  
  render() {
    const { input } = this.state;
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          value={input}
          placeholder="Deck Title"
          onChangeText={this.handleTextInput}
        />
        <TouchableOpacity
          style={!input ? [styles.addBtn, styles.disabledBtn] : styles.addBtn}
          disabled={!input}
        >
          <Text style={styles.btnText}>Add Deck</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default AddDeck;

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