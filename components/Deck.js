import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { white, midnightBlue, asbestos, greenSea, silver } from './../utils/colors'

class Deck extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.titleText}>Título do Deck</Text>
          <Text style={{color: asbestos, fontSize: 20}}># cards</Text>
        </View>
        <TouchableOpacity style={[styles.quizBtn, styles.disabledBtn]}>
          <Text style={styles.btnText}>Start Quiz</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addBtn}>
          <Text style={styles.btnText}>Add Question</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Deck;

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