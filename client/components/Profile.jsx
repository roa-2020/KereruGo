import React from "react";
import { connect } from "react-redux";
import BackLink from './BackLink'

import { apiGetOneBird, apiGetUserScrapbook, apiGetUserBadges } from "../apis/index";
import { receiveScrapbook, saveProgress } from "../actions/scrapbook";
import { receiveBadges } from '../actions/badges'

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
      const found = scrapbook.filter((entry) => entry.birdName !== "Unknown").length;
      this.props.dispatch(saveProgress(found, total));
    });
    apiGetUserBadges(this.props.auth.user.id)
      .then(badges => {
        console.log('test', badges)
        this.props.dispatch(receiveBadges(badges))
      })
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
 

    getMedal = (badge) => {
    const foundCount = badge.currentCount
    console.log(foundCount)
      if (foundCount < 10 && foundCount > 0) {
        return badge.badgeBronze
      } else if (foundCount >= 10 && foundCount < 20) {
        return badge.badgeSilver
      } else if (foundCount >= 20) {
        return badge.badgeGold
      }
    }

  render() {
    console.log(this.props, "     spacer     ");
    const userInfo = this.props.auth.user;

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
            <h3 className="has-text-centered">Unique Birds Encountered</h3>
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

          </div>
          <br />


          <div className="badge has-text-centered">
            {this.props.badges.map(badge => {
              console.log(this.getMedal(badge))
              return (
                <>
                  <div className="badge-container">
                    <h5>{badge.badgeName}</h5>
                    <img src={this.getMedal(badge)} />
                    <p>{badge.badgeTag}: {badge.currentCount} </p>
                  </div>
                </>
              )
            })}
          </div>


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
    badges: globalState.badges
  };
};
export default connect(mapStateToProps)(Profile);
