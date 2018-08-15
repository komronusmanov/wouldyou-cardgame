import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import ModeComment from '@material-ui/icons/ModeComment'
import ReplyAll from '@material-ui/icons/ReplyAll'
import { UserInfo as styles } from '../styles/styles'

const UserInfo = ({
  classes,
  img,
  name,
  answered,
  posted,
}) => (
  <Card className={classes.card}>
    <CardMedia
      className={classes.media}
      image={img}
      title={name}
      />
    <CardContent>
      <Typography
        style={{ marginBottom: 15 }}
        gutterBottom
        variant='headline'
        component='h2'>
        {name}
      </Typography>
      <Typography component="p">
        <ModeComment
          style={{ width: 17, margin: '0 15 -7 0' }}
          color="primary"
          />
        Posted {posted} questions
      </Typography>
      <Typography
        style={{ marginBottom: 8 }}
        component="p"
        >
        <ReplyAll
          style={{ width: 20, margin: '0 15 -7 0' }}
          color="primary"
          />
        Responded {answered} questions
      </Typography>
    </CardContent>
  </Card>
)

export default withStyles(styles)(UserInfo)
