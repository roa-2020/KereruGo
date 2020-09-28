import React from 'react'
import {Link} from 'react-router-dom'
// import {HashRouter as Router, Route, Link} from 'react-router-dom'

class BackLink extends React.Component {
  render() {
    return <div className={`navLink ${this.props.inline ? this.props.inline : ''}`}><Link to="/#" onClick={this.props.action}><i className="fas fa-times"></i></Link></div>

  }
}

export default BackLink
