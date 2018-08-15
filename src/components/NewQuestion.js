import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'
import { Redirect } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
})

class NewQuestion extends Component {

  state = {
    optionOneText: '',
    optionTwoText: '',
    toHome: false,
  }

  handleChangeOne = (e) => {
    const optionOneText = e.target.value
    this.setState(() => ({
      optionOneText,
    }))
  }

  handleChangeTwo = (e) => {
    const optionTwoText = e.target.value
    this.setState(() => ({
      optionTwoText,
    }))
  }

  handleSubmit = (e) => {
    const { optionOneText, optionTwoText } = this.state
    const { dispatch } = this.props

    if(optionOneText && optionTwoText) {
      dispatch(handleAddQuestion(optionOneText, optionTwoText))
    }
    this.setState(() => ({
      optionOneText: '',
      optionTwoText: '',
      toHome: true,
    }))
  }

  render() {

    const { classes } = this.props
    const { optionOneText, optionTwoText, toHome } = this.state

    if (toHome === true) {
      return <Redirect to='/' />
    }

    return(
      <div>
        <div style={{ textAlign: 'center' }}>
          <Typography
            style={{ marginTop: 20 }}
            variant='display1'
            >
            Add a New Question
          </Typography>
          <Typography
            style={{ marginTop: 20 }}
            variant='body1'
            >
            {'Would You Rather 🤔'}
          </Typography>
        </div>
        <form
          className={classes.container}
          onSubmit={this.handleSubmit}
          autoComplete='off'
          noValidate
          >
          <div style={{ textAlign: 'center' }}>
            <TextField
              id='option-one'
              label='Option One'
              placeholder=''
              multiline
              fullWidth
              rowsMax='4'
              value={optionOneText}
              onChange={this.handleChangeOne}
              className={classes.textField}
              margin='normal'
              />
            <TextField
              id='option-two'
              label='Option Two'
              placeholder=''
              multiline
              fullWidth
              rowsMax='4'
              value={optionTwoText}
              onChange={this.handleChangeTwo}
              className={classes.textField}
              margin='normal'
              />
          </div>
          <Button
            style={{ marginTop: 30 }}
            variant='outlined'
            size='medium'
            color='primary'
            className={classes.button}
            type='submit'
            disabled={optionOneText === '' || optionTwoText === ''}
            >
            Add Question
          </Button>
        </form>
      </div>
    )
  }
}

export default withStyles(styles)(connect()(NewQuestion))
