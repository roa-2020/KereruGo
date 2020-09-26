import React from "react";
import { connect } from "react-redux";

import { apiGetOneBird, apiGetUserScrapbook } from "../apis/index";
import { receiveScrapbook } from "../actions/scrapbook";

class Profile extends React.Component {
  state = {
    bird: {},
  };

  componentDidMount() {
    apiGetUserScrapbook(this.props.auth.user.id).then((scrapbook) => {
      this.props.dispatch(receiveScrapbook(scrapbook));
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      const id = this.props.scrapbook.findIndex(
        (entry) => entry.birdId === Number(this.props.match.params.id)
      );
      this.setState({
        bird: this.props.scrapbook[id],
      });
    }
  }

  
  render() {
    console.log(this.props, "     spacer     ");
    const userInfo = this.props.auth.user;
    // const medal = this.props.scrapbook.map(())
    // (this.props.scrapbook.birdName !== "???")
    // ?<li>Medal</li>
    // :<li>Not Medal</li>
    return (
        <>
      <div className="card is-centered mx-4 scrollable">
          <h1>Welcome {userInfo.username}</h1>
          {this.props.scrapbook && (
            <div className="bird-profile-img">
              <img src="" alt="Image of user"></img>
            </div>
          )}
          <div className="scrapbook-entry">
            <h5 className="has-text-centered">{userInfo.username}'s Badges</h5>
          </div>
          <div className="image-container"></div>
          <p>{medal}</p>
      </div>
      </>
    );
  }
}

const mapStateToProps = (globalState) => {
  return {
    auth: globalState.auth,
    scrapbook: globalState.scrapbook,
  };
};
export default connect(mapStateToProps)(Profile);
