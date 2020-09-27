import React from "react";
import { connect } from "react-redux";

import { apiGetOneBird, apiGetUserScrapbook } from "../apis/index";
import { receiveScrapbook } from "../actions/scrapbook";
import BackLink from "./BackLink";

class BirdProfile extends React.Component {
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
    const bird = this.state.bird;
    return (
      <div className="card is-centered mx-4 scrollable">
        {this.state.bird && (
          <>
            <div className="bird-profile-img">
              <img
                src={this.state.bird.birdImg && this.state.bird.birdImg}
                alt="Image of bird"
              ></img>
            </div>
            <div className="birdDetails">
              <h1 className="birdName has-text-centered capitalized">
                {bird.birdName && bird.birdName}
              </h1>
              <div className="subtitle">
                {bird.birdEnglishName && (
                  <p className="capitalized">
                    English Name: {bird.birdEnglishName}
                  </p>
                )}
                {bird.birdRarity && (
                  <p className="capitalized">Rarity: {bird.birdRarity}</p>
                )}
                <p>
                  Active Period:{" "}
                  {bird.birdNocturnal === 0 ? "Daylight" : "Night"}
                </p>
              </div>

              <p className="birdTag"> {bird.birdTag && bird.birdTag}</p>
              <p className="birdInfo"> {bird.birdInfo && bird.birdInfo}</p>
            </div>
          </>
        )}
        <BackLink
          action={() => {
            this.props.history.goBack();
          }}
        />
      </div>
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
export default connect(mapStateToProps)(BirdProfile);
