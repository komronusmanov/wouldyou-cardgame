import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { handleRegisterVote } from '../actions/questions'
import { Redirect } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { Question as styles } from '../styles/styles'

class Question extends Component {

  state = {
    checkVotes: false,
  }

  voteOne = (e) => {
      e.preventDefault()
      const { dispatch, id } = this.props
      const option = 'optionOne'
      const vote = { id, option }
      dispatch(handleRegisterVote(vote))
      this.setState(() => ({checkVotes: true}))
    }

  voteTwo = (e) => {
      e.preventDefault()
      const { dispatch, id } = this.props
      const option = 'optionTwo'
      const vote = { id, option }
      dispatch(handleRegisterVote(vote))
      this.setState(() => ({checkVotes: true}))
    }


  render() {

    const { question, id, authedUser, classes } = this.props
    const optionOne = question.optionOne.text
    const optionTwo = question.optionTwo.text
    const cardStyles = {
      height: 50,
      textAlign: 'center',
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: '#E8EAF6',
    }

    if(this.state.checkVotes === true) {
      return <Redirect to={`/questions/${id}/votes`}/>
    }

    if(question.optionOne.votes.includes(authedUser) ||
    question.optionTwo.votes.includes(authedUser)) {

      return (
        <Link to={`/questions/${id}/votes`} style={{textDecoration: 'none'}} className='qbox'>
          <Card className={classes.card}>
            <CardContent className={classes.content}>
              <Typography className={classes.question}
                style={{ textAlign: 'left'}}
                variant='body1'
                >
                {optionOne}
              </Typography>
              <div className={classes.or}>
                OR
              </div>
              <Typography className={classes.question}
                style={{ textAlign: 'right' }}
                variant='body1'
                >
                {optionTwo}
              </Typography>
            </CardContent>
          </Card>
        </Link>
      )
    }

    return (
      <Link to={`/questions/${id}`} style={{textDecoration: 'none'}} className='qbox'>
        <Card className={classes.card}>
          <CardContent className={classes.content}>
            <Typography className={classes.question}
              style={{ textAlign: 'left'}}
              variant='body1'
              >
              {optionOne}
            </Typography>
            <div className={classes.or}>
              OR
            </div>
            <Typography className={classes.question}
              style={{ textAlign: 'right' }}
              variant='body1'
              >
              {optionTwo}
            </Typography>
          </CardContent>
          <CardActions
            className='card-actions'
            style={cardStyles}
            >
            <Button
              style={{ width: '100%' }}
              color='primary'
              onClick={this.voteOne}>
              Vote for Option One
            </Button>
            <Button
              style={{ width: '100%' }}
              color='primary'
              onClick={this.voteTwo}>
              Vote for Option Two
            </Button>
          </CardActions>
        </Card>
      </Link>
    )
  }
}

function mapStateToProps({ questions, authedUser }, { id }) {
  const question = questions[id]
  return {
    question,
    authedUser,
  }
}


export default withStyles(styles)(connect(mapStateToProps)(Question))
