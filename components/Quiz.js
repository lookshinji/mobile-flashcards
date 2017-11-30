import React, { Component } from 'react'
import { Text, View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { clearLocalNotification, setLocalNotification } from '../utils/notifications'
//utils
import { white, midnightBlue, clouds, greenSea, silver, alizarin, asbestos } from '../utils/colors'

class Quiz extends Component {
  state = {
    answerView: false,
    currQuestion: 0,
    correct: 0,
    incorrect: 0,
  }

  checkAnswer = answer => {
    if (answer === 'correct') {
      this.setState(prevState => {
        return {
          ...prevState,
          answerView: false,
          currQuestion: prevState.currQuestion + 1,
          correct: prevState.correct + 1,
        };
      });
    } else if (answer === 'incorrect') {
      this.setState(prevState => {
        return {
          ...prevState,
          answerView: false,
          incorrect: prevState.incorrect + 1,
          currQuestion: prevState.currQuestion + 1
        }
      })
    }
  }

  restart = () => {
    this.setState({
      answerView: false,
      currQuestion: 0,
      correct: 0,
      incorrect: 0,
    })
  }

  render() {
    const { deck, questions, navigation } = this.props
    const { answerView, currQuestion, correct} = this.state
    const question = questions[currQuestion]
    const score = Math.round(correct / questions.length * 100, 2)

    !question && clearLocalNotification().then(setLocalNotification())

    return (
    !question
    ? <ScrollView style={styles.container}>
        <View>
          <Text style={styles.titleText}>You got {score}% correct</Text>
          <Text style={[styles.answerText, {marginBottom: 30}]}>{score > 80 ? `You're sharp in ${deck.title}` : `Keep studying ${deck.title}`}</Text>
          <TouchableOpacity
            style={[styles.btn, styles.correctBtn]}
            onPress={() => this.restart()}>
            <Text style={styles.btnText}>Restart Quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate('Deck', { deckId: deck.title })}>
            <Text style={styles.btnText}>Back to Deck</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    : <ScrollView style={styles.container}>
        <Text style={styles.questionText}>
          Question {currQuestion + 1}/{questions.length}
        </Text>
        <View>
          <View>
            {!answerView && (
              <View>
                <Text style={styles.titleText}>{question.question}</Text>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => this.setState({ answerView: true })}>
                  <Text style={styles.btnText}>Show Answer</Text>
                </TouchableOpacity>
              </View>
            )}
            {answerView && (
              <View>
                <View style={styles.textContainer}>
                  <Text style={styles.titleText}>{question.question}</Text>
                  <Text style={styles.answerText}>{question.answer}</Text>
                </View>
                <TouchableOpacity
                  style={[styles.btn, styles.correctBtn]}
                  onPress={() => this.checkAnswer("correct")}>
                  <Text style={styles.btnText}>Correct</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.btn, styles.incorrectBtn]}
                  onPress={() => this.checkAnswer("incorrect")}>
                  <Text style={styles.btnText}>Incorrect</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    )
  }
}

function mapStateToProps(decks, props) {
  const { deckId } = props.navigation.state.params
  const deck = decks[deckId];
  return {
    deck,
    questions: deck.questions.map((question, index) => {
      return {
        ...question,
        number: index
      }
    })
  }
}

export default connect(mapStateToProps)(Quiz)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: clouds,
    paddingTop: 30,
  },
  textContainer: {
    marginLeft: 20,
    marginRight: 20,
    alignItems: 'center',
  },
  titleText: {
    color: midnightBlue,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  answerText: {
    color: midnightBlue,
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  questionText: {
    color: asbestos,
    fontSize: 18,
    textAlign: 'center',
    paddingBottom: 30
  },
  btn: {
    backgroundColor: midnightBlue,
    padding:10,
    margin: 5,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },
  correctBtn: {
    backgroundColor: greenSea,
  },
  incorrectBtn: {
    backgroundColor: alizarin,
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
