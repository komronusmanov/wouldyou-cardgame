import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import AccountCircle from '@material-ui/icons/AccountCircle'
import SmallAvatar from './SmallAvatar'
import { AnsweredQuestion as styles } from '../styles/styles'
import { withStyles } from '@material-ui/core/styles'

const AnsweredQuestion = ({
  match,
  realName,
  imageURL,
  authedUser,
  optionOne,
  optionTwo,
  answer,
  classes,
}) => {

  const total = optionOne + optionTwo
  const optionOnePercent = parseInt(100 * (optionOne/total), 10)
  const optionTwoPercent = parseInt(100 - optionOnePercent, 10)

  return (
    <div className={classes.container}>
      <Typography
        styles={{ marginTop: 20 }}
        variant='display1'
        >
        Would You Rather?
      </Typography>
      <div className={classes.feed}>
        <Card className={classes.card}>
          <CardContent className={classes.content}>
            <Typography className={classes.question}
              style={{ textAlign: 'left'}}
              variant='body1'
              >
              Voted by {optionOne} Users
            </Typography>
            <div className={classes.or}>
              OR
            </div>
            <Typography className={classes.question}
              style={{ textAlign: 'right' }}
              variant='body1'
              >
              Voted by {optionTwo} Users
            </Typography>
          </CardContent>
          <div className={classes.answer}>
            <Typography
              style={{ paddingTop: 6 }}
              variant="caption"
              color="default"
              >
              You voted for {answer}
            </Typography>
          </div>
          <div className={classes.votes}>
            <Typography
              style={{ textAlign: 'left'}}
              variant="display2"
              >
              {`${optionOnePercent}%`}
            </Typography>
            <Typography
              style={{ textAlign: 'right' }}
              variant="display2"
              >
              {`${optionTwoPercent}%`}
            </Typography>
          </div>
        </Card>
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

  function mapStateToProps({ questions, users, authedUser, id }, { match }) {

    const userName = questions[match.params.id].author
    const realName = authedUser === userName ? 'You' : users[userName].name
    const imageURL = users[userName].avatarURL
    const optionOne = questions[match.params.id].optionOne.votes.length
    const optionTwo = questions[match.params.id].optionTwo.votes.length

    let answer = ''
    if (questions[match.params.id].optionOne.votes.includes(authedUser)) {
      answer = 'option One 👌'
    } else if (questions[match.params.id].optionTwo.votes.includes(authedUser)) {
      answer = 'option Two 👌'
    }

    return {
      realName,
      imageURL,
      optionOne,
      optionTwo,
      answer,
    }
  }

  export default withStyles(styles)(connect(mapStateToProps)(AnsweredQuestion))
