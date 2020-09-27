import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../actions/auth";
import BackLink from "./BackLink";
import Home from "./Home";
// import {HashRouter as Router, Route, Link} from 'react-router-dom'

class Nav extends React.Component {
  render() {
    const { auth, logout } = this.props;
    return (
      <div className="card is-centered mx-4 navigation">
        {auth.isAuthenticated ? (
          <>
            <Link to="/" onClick={() => logout()}>
              Logout
            </Link>
            <Link to="/map">Map</Link>
            <Link to="/scrapbook">Scrapbook</Link>
            <Link to="/profile">Profile</Link>
            <a href="https://www.forestandbird.org.nz/projects/project-kereru-dunedin" target="_blank">Donate  <i className="fas fa-donate"></i></a>
            <BackLink
              action={() => {
                this.props.history.goBack();
              }}
            />
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    logout: () => {
      const confirmSuccess = () => ownProps.history.push("/");
      dispatch(logoutUser(confirmSuccess));
    },
  };
};

const mapStateToProps = ({ auth }) => {
  return {
    auth,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
