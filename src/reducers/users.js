import { GET_USERS, REGISTER_VOTE, ADD_USER } from '../actions/types'

export default function users (state = {}, action) {
  switch(action.type) {
    case GET_USERS :
    return {
      ...state,
      ...action.users
    }
    case ADD_USER :
    return {
      ...state,
      [action.user.id]: action.user
    }
    case REGISTER_VOTE :
    return {
      ...state,
      [action.authedUser]: {
        ...state[action.authedUser],
        answers: {
          ...state[action.authedUser].answers,
          [action.qid]: action.answer,
        }
      }
    }
    default :
    return state
  }
}
