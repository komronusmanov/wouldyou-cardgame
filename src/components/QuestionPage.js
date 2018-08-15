import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import AccountCircle from '@material-ui/icons/AccountCircle'
import SmallAvatar from './SmallAvatar'
import Question from './Question'
import { QuestionPage as styles } from '../styles/styles'

class QuestionPage extends Component {

  render () {

    const { realName, imageURL, match, classes } = this.props
    const { id } = match.params

    return (
      <div className={classes.container}>
        <Typography
          styles={{ marginTop: 50 }}
          variant='display1'
          >
          Would You Rather?
        </Typography>
        <div className={classes.feed}>
          <Question id={id}/>
        </div>
        <div style={{ marginTop: 10 }}>
          <Typography
            color='inherit'
            variant='caption'
            >
            {`Posted by ${realName}`}
          </Typography>
          {imageURL === '' ?
            <div>
              <IconButton
                aria-haspopup='true'
                color='inherit'
                >
                <AccountCircle/>
              </IconButton>
            </div> :
            <div>
              <SmallAvatar
                image={imageURL}
                name={realName}
                />
            </div>}
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
    }
  }

  function mapStateToProps({ questions, users, authedUser, id }, { match }) {

    const userName = questions[match.params.id].author
    const realName = authedUser === userName ? 'You' : users[userName].name
    const imageURL = users[userName].avatarURL
    return {
      realName,
      imageURL,
    }
  }


  export default withStyles(styles)(connect(mapStateToProps)(QuestionPage))
