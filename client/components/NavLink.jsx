import React from 'react'
import {Link} from 'react-router-dom'
// import {HashRouter as Router, Route, Link} from 'react-router-dom'

class NavLink extends React.Component {
  render() {
    return <div className='navLink'><Link to="/nav"><i className="fas fa-bars"></i></Link></div>

  }
}

export default NavLink
