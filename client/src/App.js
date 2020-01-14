import React, { Fragment,useEffect } from 'react';
import ChatBox from './components/ChatBox';
import Admin from './components/Admin'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Register from './components/layout/Register'
import PropTypes from 'prop-types'
import {Provider} from 'react-redux'
import store from './store'

import './App.css';
import Login from './components/layout/Login'
//Redux
import { connect } from 'react-redux'
import setAuthToken from './utils/setAuthToken'
import { loadUser } from './actions/auth'




if (localStorage.token) {
  setAuthToken(localStorage.token)
}


const App = () => {

  
  useEffect(() => {
    store.dispatch(loadUser())
  },[])
  return (
    <Provider store={store}>
    <Fragment>
      <Navbar />
      <Router>
        <div>

           <Route path='/register' component={Register} />
           <Route path='/login' component={Login} />

          <Route path="/admin" component={Admin} />
         <ChatBox/>
        
        </div>
      </Router>
    </Fragment>
    </Provider>
  )
}

export default App;
