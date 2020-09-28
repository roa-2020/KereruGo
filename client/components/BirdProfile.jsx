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
    let rarityIcon = ''
      if(this.state.bird.birdRarity == 'common'){
      rarityIcon = <i className="fas fa-smile mb-3"></i>
    } else if (bird.birdRarity == 'vulnerable'){
      rarityIcon = <i className="fas fa-meh mb-3"></i>
    } else if (bird.birdRarity == 'extinct'){
      rarityIcon = <i className="fas fa-grimace mb-3"></i>
    } else {
      rarityIcon = <i className="fas fa-frown mb-3"></i>
    } 

    return (
      <div className="card is-centered mx-4 scrollable">
        {this.state.bird && (
            <>
            <div className="bird-profile-img">
              <img
                src={this.state.bird.birdImg && this.state.bird.birdImg}
                alt="Image of bird">
              </img>
            </div>
            <div className="birdDetails mb-6">
              <h1 className="birdName title is-3 has-text-centered is-capitalized">
                {bird.birdName && bird.birdName}
              </h1>
              <h2 className="subtitle is-5 has-text-centered is-italic has-text-weight-light">
                {bird.birdEnglishName}
              </h2>
              <div className="birdIcons mb-4">
                <div className="icon-group">
                  {bird.birdNocturnal === 0 ? <i className="fas fa-sun mb-3"></i> : <i class="fas fa-moon mb-3"></i>}
                  <p>AM/PM</p>
                </div>
                 <div className="icon-group">
                  {rarityIcon}
                  <p>Rarity</p>
                </div>
                <div className="icon-group">
                  <i className="fab fa-pagelines mb-3"></i>
                  <p>Habitat</p>
                </div>
              </div>
              {/* <div className="subtitle">
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
              </div> */}

              <p className="birdTag"> {bird.birdTag && bird.birdTag}</p>
              {/* <p className="birdInfo"> {bird.birdInfo && bird.birdInfo}</p> */}
            
           </div>
           </>
        )}
        <BackLink
        inline='inline'
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
