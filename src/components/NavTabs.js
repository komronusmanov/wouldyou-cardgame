import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import QuestionList from './QuestionList'

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
})

class NavTabs extends Component {

  state = {
    value: 0,
  }

  handleChange = (event, value) => {
    this.setState({ value })
  }

  render() {

    const { classes } = this.props
    const { value } = this.state

    return (
      <Paper className={classes.root}>
        <Tabs
          centered
          fullWidth
          indicatorColor='primary'
          textColor='primary'
          value={value}
          onChange={this.handleChange}
          >
          <Tab label='UNANSWERED'/>
          <Tab label='ANSWERED'/>
        </Tabs>
        <QuestionList
          answered={value}
          />
      </Paper>
    )
  }
}

export default withStyles(styles)(NavTabs)
