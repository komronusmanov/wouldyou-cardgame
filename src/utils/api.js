import {
  _getUsers,
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer,
  _saveUser,
} from './_DATA'

export function getInitialData() {
  return Promise.all([
    _getUsers(),
    _getQuestions(),
  ]).then(([users, questions]) => ({
    users,
    questions,
  }))
}

export function saveQuestion(question) {
  return _saveQuestion(question)
}

export function getAuthUsers() {
  return _getUsers()
}

export function saveQuestionAnswer({ authedUser, qid, answer }){
  return _saveQuestionAnswer({ authedUser, qid, answer })
}

export function saveUser({ id, name, avatarURL, answers, questions}) {
  return _saveUser({ id, name, avatarURL, answers, questions})
}
