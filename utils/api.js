import { AsyncStorage } from 'react-native'

export const DECKS_STORAGE_KEY = 'cards:decks'

export function setInitialData (){
  const initialData = {
    React: {
      title: 'React',
      questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        }
      ]
    },
    JavaScript: {
      title: 'JavaScript',
      questions: [
        {
          question: 'What is a closure?',
          answer:
            'The combination of a function and the lexical environment within which that function was declared.'
        }
      ]
    }
  }
  AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(initialData))
  return initialData
}

export function fetchDecks () {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
  .then(results => {
    return results === null ? setInitialData() : JSON.parse(results)
  })
}

export function submitDeck (deck) {
  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
    [deck]: {
      title: deck,
      questions: []
    }
  }))
}

export function submitCard (deck, card) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY, (err, result) => {
    let openedDeck = JSON.parse(result)[deck.title]
    let questions = openedDeck.questions
    questions[questions.length] = card
    openedDeck.questions = questions
    AsyncStorage.mergeItem(
      DECKS_STORAGE_KEY,
      JSON.stringify({ [deck.title]: openedDeck })
    )
  })
}
