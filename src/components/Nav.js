import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import SmallAvatar from './SmallAvatar'
import { Nav as styles } from '../styles/styles'
import { logOut } from '../actions/authedUser'

class Nav extends Component {

  state = {
    anchorEl: null,
  }

  handleMenu = (e) => {
    this.setState({ anchorEl: e.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  logOut = () =>{
    this.props.dispatch(logOut())
    this.setState({ anchorEl: null })
  }

  render() {

    const { classes, authedUserID, authedUserURL, authedUserName } = this.props
    const { anchorEl } = this.state
    const open = Boolean(anchorEl)

    return (
      <div className={classes.root}>
        <AppBar
          position='static'
          >
          <Toolbar>
            <IconButton
              aria-label='Menu'
              aria-owns={open ? 'menu-appbar' : null}
              className={classes.menuButton}
              color='inherit'
              onClick={this.handleMenu}>
              <MenuIcon/>
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorEl}
              open={open}
              onClose={this.handleClose}
              >
              <Link to='/' style={{ textDecoration: 'none'}}>
                <MenuItem onClick={this.handleClose}>Home</MenuItem>
              </Link>
              <Link to='/leaderboard' style={{ textDecoration: 'none'}}>
                <MenuItem onClick={this.handleClose}>LeaderBoard</MenuItem>
              </Link>
              {authedUserID ?
                <Link to='/login' style={{ textDecoration: 'none'}}>
                  <MenuItem onClick={this.logOut}>Logout</MenuItem>
                </Link> :
                <Link to='/login' style={{ textDecoration: 'none'}}>
                  <MenuItem onClick={this.handleClose}>Login</MenuItem>
                </Link>
              }
            </Menu>
            <Typography
              className={classes.flex}
              color='inherit'
              variatn='title'>
              Would You Rather Card Game
            </Typography>
            { authedUserID === '' ?
              <div>
                <IconButton
                  disabled
                  aria-haspopup='true'
                  color='default'
                  >
                  <AccountCircle/>
                </IconButton>
              </div> :
              <Link to='/info'>
                <SmallAvatar
                  image={authedUserURL}
                  name={authedUserName}
                  />
              </Link>}
            </Toolbar>
          </AppBar>
        </div>
      )
    }
  }

  function mapStateToProps ({ authedUser, users }) {
    if (authedUser !== null) {
      const logged = users[authedUser]
      return {
        authedUserURL: logged.avatarURL,
        authedUserID: logged.id,
        authedUserName: logged.name,
      }
    }
    return {
      authedUserURL: '',
      authedUserID: '',
      authedUserName: '',
    }
  }

  export default withStyles(styles)(connect(mapStateToProps)(Nav))
