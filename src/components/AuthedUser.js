import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import UserInfo from './UserInfo'
import { withStyles } from '@material-ui/core/styles'
import { LeaderBoard as styles } from '../styles/styles'

const AuthedUser = ({
  classes,
  name,
  avatar,
  answered,
  asked,
}) => (
  <div className={classes.container}>
    <div className={classes.feed}>
      <UserInfo
        img={avatar}
        name={name}
        answered={answered}
        posted={asked}
        />
    </div>
    <Link to='/' style={{ textDecoration: 'none' }}>
      <Button
        style={{ marginTop: 10 }}
        variant='outlined'
        className={classes.button}
        >
        {'Go 🔙 Home'}
      </Button>
    </Link>
  </div>
)


function mapStateToProps({ users, authedUser }) {
  const choosenUser = users[authedUser]
  return {
    name: choosenUser.name,
    avatar: choosenUser.avatarURL,
    answered: Object.keys(choosenUser.answers).length,
    asked: choosenUser.questions.length,
  }
}

export default withStyles(styles)(connect(mapStateToProps)(AuthedUser))
