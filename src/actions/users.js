import { saveUser } from '../utils/api'
import { GET_USERS, ADD_USER } from './types'

export function getUsers (users) {
  return {
    type: GET_USERS,
    users
  }
}

export function addUser (user) {
  return {
    type: ADD_USER,
    user,
  }
}

export function handleAddUser(id, name, avatarURL) {
  return (dispatch) => {
    return saveUser({
      id,
      name,
      avatarURL,
      answers: {},
      questions: [],
    })
      .then(user => dispatch(addUser(user)))
  }
}
