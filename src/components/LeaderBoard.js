import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import UserInfo from './UserInfo'
import { LeaderBoard as styles } from '../styles/styles'

const LeaderBoard = ({
  details,
  classes,
}) => (
  <div className={classes.container}>
    <Typography
      style={{ marginTop: 20 }}
      variant='display1'
      >
      Leaderboard
    </Typography>
    <Typography
      style={{ marginTop: 15, textAlign: 'center' }}
      variant='body1'
      >
      {"App's Top Performers"}
    </Typography>
    <Typography
      style={{ marginTop: 10, textAlign: 'center' }}
      >
      {"More Questions They Post And Vote, Higher They Rank"}
    </Typography>
    <ul className={classes.feed}>
      {details
        .map(user => (
          <li
            key={user.name}
            style={{ listStyleType: 'none' }}
            >
            <UserInfo
              img={user.img}
              name={user.name}
              answered={user.answered}
              posted={user.posted}
              />
          </li>
        ))}
      </ul>
    </div>
  )

  function mapStateToProps({ users }) {
    const details = Object.keys(users)
    .map((user) => {
      const userInfo = {
        img: users[user].avatarURL,
        name: users[user].name,
        answered: Object.keys(users[user].answers).length,
        posted: users[user].questions.length,
      }
      const rank = userInfo.answered + userInfo.posted
      userInfo.userRank = rank
      return (userInfo)
    })
    .sort((a,b) => (
      b.userRank - a.userRank
    ))
    return {
      details,
    }
  }

  export default withStyles(styles)(connect(mapStateToProps)(LeaderBoard))
