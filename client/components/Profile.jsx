import React from "react";
import { connect } from "react-redux";
import BackLink from './BackLink'

import { apiGetOneBird, apiGetUserScrapbook, apiGetUserBadges } from "../apis/index";
import { receiveScrapbook, saveProgress } from "../actions/scrapbook";
import { receiveBadges } from '../actions/badges'

export class Profile extends React.Component {
  state = {
    bird: {},
    found: 0,
    total: 0,
    medalName: ''
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
        if (foundCount < badge.silverReq && foundCount >= badge.bronzeReq) {
          this.setState({medalName: 'bronze'})
          return <i className="fas fa-medal fa-3x bronze-medal"></i>

        } else if (foundCount >= badge.silverReq && foundCount < badge.goldReq) {
          this.setState({medalName: 'silver'})
          return <i className="fas fa-medal fa-3x silver-medal"></i>

        } else if (foundCount >= badge.goldReq) {
          this.setState({medalName: 'gold'})
          return <i className="fas fa-medal fa-3x gold-medal"></i>
        }
    }

    // getMedalName = (badge) => {
    //   const foundCount = badge.currentCount
  
    //     if (foundCount < 10 && foundCount > 0) {
    //       return badge.bronzeReq
    //     } else if (foundCount >= 10 && foundCount < 20) {
    //       return badge.silverReq
    //     } else if (foundCount >= 20) {
    //       return badge.goldReq
    //     }
    //   }


  render() {
    console.log(this.props, "     spacer     ");
    const userInfo = this.props.auth.user;

    return (
      <>
        <div className="card is-centered mx-4 scrollable">
          {this.props.scrapbook && (
            <div className="bird-profile-img">
              
              {/* <img src={this.props.auth.user.user_image || '/images/mystery-bird.png'} alt="Image of user"></img */}
              {this.props.auth.user.user_image || <i className="user-icon fas fa-user fa-7x"></i>}
            </div>
          )}
          <div>
            <h1 className="user-name birdName has-text-centered has-text-weight-light">{userInfo.username}</h1>
            <h3 className="has-text-centered has-text-weight-light">Unique Birds Encountered</h3>
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
            
              return (
                <>
                  <div className="badge-container">
                    <h5 className="has-text-weight-light">You have earned a {this.state.medalName} medal!</h5>
                    {this.getMedal(badge)}
                    {/* <p>{badge.badgeTag}: {badge.currentCount} </p> */}
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
