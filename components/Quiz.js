import React, { Component } from 'react'
import { Text, View, ScrollView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { clearLocalNotification, setLocalNotification } from '../utils/notifications'

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
    const { deck, questions } = this.props
    const { answerView, currQuestion, correct} = this.state
    const question = questions[currQuestion]
    const score = Math.round(correct / questions.length * 100, 2)

    !question && clearLocalNotification().then(setLocalNotification())

    return (
    !question
    ? <ScrollView>
        <View>
          <Text>You got {score}% correct {score > 80 ? `You're sharp in ${deck.title}` : `Keep studying ${deck.title}`}</Text>
          <TouchableOpacity
            onPress={() => this.restart()}>
            <Text>Restart Quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Deck', { deckId: deck.title })}>
            <Text>Back to Deck</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    : <ScrollView>
        <Text>
          {currQuestion + 1}/{questions.length}
        </Text>
        <View>
          <View style={{ flex: 1 }}>
            {!answerView && (
              <View>
                <Text>{question.question}</Text>
                <TouchableOpacity
                  onPress={() => this.setState({ answerView: true })}>
                  <Text>Show Answer</Text>
                </TouchableOpacity>
              </View>
            )}
            {answerView && (
              <View>
                <Text>{question.answer}</Text>
                <TouchableOpacity
                  onPress={() => this.checkAnswer("correct")}>
                  <Text>Correct</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.checkAnswer("incorrect")}>
                  <Text>Incorrect</Text>
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
  const deck = decks[props.navigation.state.params.deckId];
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
