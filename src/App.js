import React, { Component } from 'react'
import { connect} from 'react-redux'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import LoadingBar from 'react-redux-loading-bar'
import { handleInitialData } from './actions/shared'
import Login from './components/Login'
import AddUser from './components/AddUser'
import LeaderBoard from './components/LeaderBoard'
import NewQuestion from './components/NewQuestion'
import QuestionPage from './components/QuestionPage'
import AnsweredQuestion from './components/AnsweredQuestion'
import AddButton from './components/AddButton'
import AuthedUser from './components/AuthedUser'
import PrivateRoute from './components/PrivateRoute'
import Nav from './components/Nav'
import NavTabs from './components/NavTabs'


class App extends Component {

  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <Router>
        <div>
          <LoadingBar color='red' showFastAction/>
          <Nav />
          <Link to='/add'><AddButton/></Link>
          <Switch>
            <Route
              path='/login'
              exact
              component={Login}
              />
            <Route
              path='/create'
              exact
              component={AddUser}
              />
            <PrivateRoute
              path='/'
              exact
              component={NavTabs}
              />
            <PrivateRoute
              path='/leaderboard'
              exact
              component={LeaderBoard}
              />
            <PrivateRoute
              path='/add'
              exact
              component={NewQuestion}
              />
            <PrivateRoute
              path='/questions/:id'
              exact
              component={QuestionPage}
              />
            <PrivateRoute
              path='/questions/:id/votes'
              exact
              component={AnsweredQuestion}
              />
            <PrivateRoute
              path='/info'
              exact
              component={AuthedUser}
              />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default connect()(App)
