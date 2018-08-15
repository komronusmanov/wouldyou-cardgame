import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { QuestionList as styles } from '../styles/styles'
import Question from './Question'

const QuestionList = ({
  answeredIds,
  unansweredIds,
  classes,
  answered,
}) => (
  <div className={classes.container}>
    <ul className={classes.feed}>
      {answered === 0 ?
        unansweredIds
        .map(id => (
          <li key={id} style={{ listStyleType: 'none'}}>
            <Question id={id}/>
          </li>)) :
          answeredIds
          .map(id => (
            <li key={id} style={{ listStyleType: 'none' }}>
              <Question id={id}/>
            </li>
          ))}
        </ul>
      </div>
    )

function mapStateToProps ({ questions, authedUser }) {
  const answered = Object.keys(questions)
  .filter(i => (
    questions[i].optionOne.votes.includes(authedUser) ||
    questions[i].optionTwo.votes.includes(authedUser)
  ))
  .sort((a,b) => (
    questions[b].timestamp - questions[a].timestamp
  ))

  const unanswered = Object.keys(questions)
  .filter(e => (
    !questions[e].optionOne.votes.includes(authedUser) &&
    !questions[e].optionTwo.votes.includes(authedUser)
  ))
  .sort((a,b) => (
    questions[b].timestamp - questions[a].timestamp
  ))
  return {
    answeredIds: answered,
    unansweredIds: unanswered,
  }
}

export default withStyles(styles)(connect(mapStateToProps)(QuestionList))
