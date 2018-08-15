import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import SmallAvatar from './SmallAvatar'
import { withStyles } from '@material-ui/core/styles'
import { Login as styles } from '../styles/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { handleSetAuthedUser } from '../actions/authedUser'

class Login extends Component {

  login = (id) => {
    const { dispatch } = this.props
    dispatch(handleSetAuthedUser(id))
  }

  render() {

    const { userDetails, classes, authedUser } = this.props

    if (authedUser !== null) {
      return (
        <Redirect to='/' />
      )
    }

    return (
      <div className={classes.container}>
        <Typography
          style={{ marginTop: 20}}
          variant='display1'>
          Login
        </Typography>
        <Typography
          style={{ marginTop: 15, textAlign: 'center'}}
          variant='body1'
          >
          Please Choose a User to Continue:
        </Typography>
        <Typography
          style={{ marginTop: 10, textAlign: 'center' }}
          variant="caption"
          >
          {'Only logged users can vote, submit new questions or view leaderboards. Don\'t miss out on all the fun 🎉'}
        </Typography>
        <ul className={classes.feed}>
          {userDetails
            .map(user => (
              <li
                key={user.name}
                style={{ listStyleType: 'none' }}
                onClick={() => this.login(user.userID)}
                >
                <SmallAvatar
                  image={user.image}
                  name={user.name}
                  />
                <Typography
                  style={{ marginBottom: 10, textAlign: 'center'}}
                  variatn='caption'
                  color='default'
                  >
                  {user.name}
                </Typography>
              </li>
            ))}
          </ul>
            <Typography
              style={{ marginTop: 20 }}
              variant='display1'>
              OR
            </Typography>
          <Link to='/create' style={{ textDecoration: 'none' }}>
            <Button
              style={{ marginTop: 20, marginBottom: 20 }}
              size='large'
              variant='outlined'
              color='secondary'>
              Add New User
            </Button>
          </Link>
        </div>
      )
    }
  }


  function mapStateToProps({ users, authedUser }) {
    const userDetails = Object.keys(users)
    .map((user) => {
      const tempUserDetails = {
        image: users[user].avatarURL,
        name: users[user].name,
        userID: users[user].id,
      }
      return (tempUserDetails)
    })
    return {
      userDetails,
      authedUser,
    }
  }

  export default withStyles(styles)(connect(mapStateToProps)(Login))
