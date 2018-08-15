import { getInitialData } from '../utils/api'
import { getUsers } from '../actions/users'
import { getQuestions } from '../actions/questions'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

export function handleInitialData () {
  return (dispatch) => {
    return getInitialData()
    .then(({ users, questions }) => {
      dispatch(showLoading())
      dispatch(getUsers(users))
      dispatch(getQuestions(questions))
      dispatch(hideLoading())
    })
  }
}
