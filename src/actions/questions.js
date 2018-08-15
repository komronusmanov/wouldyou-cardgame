import { saveQuestionAnswer, saveQuestion } from '../utils/api'
import { GET_QUESTIONS, ADD_QUESTION, REGISTER_VOTE } from './types'


export function getQuestions (questions) {
  return {
    type: GET_QUESTIONS,
    questions
  }
}

function addQuestion (question) {
  return {
    type: ADD_QUESTION,
    question,
  }
}

export function handleAddQuestion(optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const { authedUser } = getState()
    return saveQuestion({
      author: authedUser,
      optionOneText,
      optionTwoText,
    })
    .then(question => dispatch(addQuestion(question)))
  }
}


function registerVote ({ authedUser, qid, answer}) {
  return {
    type: REGISTER_VOTE,
    authedUser,
    qid,
    answer
  }
}

export function handleRegisterVote(info) {
  return (dispatch, getState) => {
    const { authedUser } = getState()
    const payLoad = {
      authedUser: authedUser,
      qid: info.id,
      answer: info.option,
    }
    dispatch(registerVote(payLoad))
    return saveQuestionAnswer(payLoad)
  }
}
