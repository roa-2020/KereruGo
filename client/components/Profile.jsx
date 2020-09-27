import React from "react";
import { connect } from "react-redux";
import BackLink from './BackLink'

import { apiGetOneBird, apiGetUserScrapbook } from "../apis/index";
import { receiveScrapbook, saveProgress } from "../actions/scrapbook";

class Profile extends React.Component {
  state = {
    bird: {},
    found: 0,
    total: 0,
  };

  componentDidMount() {
    apiGetUserScrapbook(this.props.auth.user.id).then((scrapbook) => {
      this.props.dispatch(receiveScrapbook(scrapbook));
      const total = scrapbook.length;
      const found = scrapbook.filter((entry) => entry.birdName !== "???")
        .length;
      this.props.dispatch(saveProgress(found, total));
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
          {this.props.scrapbook && (
            <div className="bird-profile-img">
              {console.log(this.props.auth.user)}
              <img src={this.props.auth.user.user_image || '/images/mystery-bird.png'} alt="Image of user"></img>
            </div>
          )}
          <div>
            <h1 className="birdName has-text-centered capitalized">{userInfo.username}</h1>
            <h3 className="has-text-centered">Birds Encountered</h3>
            <div className="progress">
              <progress
                max={this.props.progress.totalBirds}
                value={this.props.progress.foundCount}
              ></progress>
              <span className="value">
                {this.props.progress.foundCount} /{" "}
                {this.props.progress.totalBirds}
              </span>
            </div>
            {/* <h5 className="has-text-centered">{userInfo.username}'s Badges</h5> */}
          </div>
          <div className="image-container bronze-medal"><i class="fas fa-medal fa-3x"></i></div>
          {/* <p>{medal}</p> */}
          <BackLink
          action={() => {
            this.props.history.goBack();
          }}
        />
        </div>
      </>
    );
  }
}

const mapStateToProps = (globalState) => {
  return {
    auth: globalState.auth,
    scrapbook: globalState.scrapbook,
    progress: globalState.progress,
  };
};
export default connect(mapStateToProps)(Profile);
