import React from 'react'
import "bulma/css/bulma.css";
import { HashRouter as Router, Route, Link, Redirect } from 'react-router-dom'
import {connect} from 'react-redux'
import Nav from './Nav'
import Home from './Home'
import Login from './Login'
import Register from './Register'
import BirdProfile from './BirdProfile'
import Map from './Map'
import Scrapbook from './Scrapbook'

import { checkAuth } from '../actions/auth'

export class App extends React.Component {
  componentDidMount() {
    const confirmSuccess = () => { }
    this.props.dispatch(checkAuth(confirmSuccess))
  }

  render() {
    const { auth } = this.props
    return (
      <>
        <Router>
          <div className="bodyContent">
            {auth.isAuthenticated ? (
              <Redirect to = '/bird/2'/>
            ) : (
              <Redirect to = '/' />
            )}
            <Route exact path="/" component={Home} />
            <Route path="/map" component={Map} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/bird/:id" component={BirdProfile} />
            <Route path="/scrapbook" component={Scrapbook} />
          </div>  
        </Router>
      </>
    )
  }
}

const mapStateToProps = ({auth}) => {
  return {
    auth,
    Scrapbook,
    BirdProfile
  }
}

export default connect(mapStateToProps)(App)
