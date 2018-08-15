import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Dropzone from 'react-dropzone'
import Background from '../images/avatar.png'
import { handleAddUser } from '../actions/users'
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

class AddUser extends Component {


  state = {
    name: '',
    id: '',
    avatarURL: '',
    answers: {},
    questions: [],
    toLogin: false,
  }

  onDrop = (acceptedFiles, rejectedFiles) => {
    const file = acceptedFiles.find(f => f)
    const i = new Image()
    i.onload = () => {
      let reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        console.log({
          src: file.preview,
          data: reader.result
        })
      }
    }
    i.src = file.preview
    this.setState(() => ({
      avatarURL: i.src
    }))
  }

  handleId = (e) => {
    const id = e.target.value
    this.setState(() => ({
      id,
    }))
  }

  handleName = (e) => {
    const name = e.target.value
    this.setState(() => ({
      name,
    }))
  }

  handleSubmit = (e) => {
    const { id, name, avatarURL, answers, questions } = this.state
    const { dispatch } = this.props
    dispatch(handleAddUser(id, name, avatarURL, answers, questions))
    this.setState(() => ({
      id: '',
      name: '',
      avatarURL: '',
      answers: {},
      questions: [],
      toLogin: true,
    }))
  }

  render() {

    const { classes } = this.props
    const { name, id, avatarURL, toLogin } = this.state

    var dropzone = {
      height: 180,
      width: 180,
      backgroundImage: `url(${Background})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      marginTop: 30,
    }

    if(avatarURL) {
      dropzone.backgroundImage = `url(${avatarURL})`
    }

    if (toLogin === true) {
      return <Redirect to='/login' />
    }

    return (
      <div>
        <div style={{ textAlign: 'center' }}>
          <Typography
            style={{ marginTop: 20 }}
            variant='display1'
            >
            Add a New User
          </Typography>
        </div>
        <form
          className={classes.container}
          onSubmit={this.handleSubmit}
          autoComplete='off'
          noValidate
          >
          <Dropzone
            style={dropzone}
            onDrop={this.onDrop}>
          </Dropzone>
          <div style={{ textAlign: 'center' }}>
            <TextField
              id='id'
              label='ID'
              placeholder=''
              fullWidth
              rowsMax='4'
              value={id}
              onChange={this.handleId}
              className={classes.textField}
              margin='normal'
              />
            <TextField
              id='name'
              label='Full Name'
              placeholder=''
              fullWidth
              rowsMax='4'
              value={name}
              onChange={this.handleName}
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
            disabled={name === '' || id === '' || avatarURL === ''}
            >
            Add User
          </Button>
        </form>
      </div>
    )
  }
}


export default withStyles(styles)(connect()(AddUser))
