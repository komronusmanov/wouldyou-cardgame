import { _getUsers } from '../utils/_DATA.js'
import { SET_AUTHED_USER, LOG_OUT } from './types'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

function setAuthedUser(id) {
  return {
    type: SET_AUTHED_USER,
    id,
  }
}

export function handleSetAuthedUser(id) {
  return (dispatch) => {
    return _getUsers()
    .then((users) => {
      dispatch(showLoading())
      dispatch(setAuthedUser(id))
      dispatch(hideLoading())
    })
  }
}

export function logOut() {
  return {
    type: LOG_OUT,
  }
}
