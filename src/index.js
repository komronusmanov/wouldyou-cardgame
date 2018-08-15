import React from 'react'
import ReactDOM from 'react-dom'
import reducer from './reducers'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import middleware from './middlewares'
import App from './App'
import './App.css'

const store = createStore(reducer, middleware)

ReactDOM.render(
  <BrowserRouter>
  <Provider store={store}>
      <App />
  </Provider>
</BrowserRouter>,
  document.getElementById('root')
)
