import React from "react";
import "bulma/css/bulma.css";
import { HashRouter as Router, Route, Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Nav from "./Nav";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import BirdProfile from "./BirdProfile";
import Map from "./Map";
import Scrapbook from "./Scrapbook";

import { checkAuth, logoutUser } from "../actions/auth";

export class App extends React.Component {
  componentDidMount() {
    const confirmSuccess = () => {};
    this.props.dispatch(checkAuth(confirmSuccess));
  }
  logout = () => {
    const confirmSuccess = () => ownProps.history.push('/')
    this.props.dispatch(logoutUser(confirmSuccess))
  }

  render() {
    const { auth } = this.props;
    return (
      <>
        <Router>
          <div
            id="body-content"
            className="container content is-full has-background-primary"
          >
            <h1 className="has-text-white pt-3 has-text-centered">
              <i>Kereru Go!</i>
            </h1>
            <div className="card is-centered mx-4">
              {auth.isAuthenticated ? (
                <Redirect to="/map" />
              ) : (
                <Redirect to="/" />
              )}
              <Route exact path="/" component={Home} />
              <Route path="/map" component={Map} />
              <Route path="/birdprofile" component={BirdProfile} />
              <Route path="/scrapbook" component={Scrapbook} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
            </div>
          </div>
          {auth.isAuthenticated && (
            <Link to="/" className="button is-rounded" onClick={() => this.logout()}>
              Logout
            </Link>
          )}
        </Router>
      </>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    auth,
  };
};

export default connect(mapStateToProps)(App);
