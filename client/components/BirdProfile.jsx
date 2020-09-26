import React from "react";
import { connect } from "react-redux";

import { apiGetOneBird, apiGetUserScrapbook} from "../apis/index";
import { receiveScrapbook } from '../actions/scrapbook'

class BirdProfile extends React.Component {
  state = {
    bird: {},
  };

  componentDidMount() {
    apiGetUserScrapbook(this.props.auth.user.id)
    .then(scrapbook => {
      this.props.dispatch(receiveScrapbook(scrapbook))
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      const id = this.props.scrapbook.findIndex(entry => entry.birdId === Number(this.props.match.params.id))
      this.setState({
        bird: this.props.scrapbook[id] 
      })
    }
  }

  render() {
    const bird = this.state.bird;
    return (
      <div className='card is-centered mx-4 scrollable'>
      {this.state.bird && 
      <>
          <div className="bird-profile-img">
            <img
              src={this.state.bird.birdImg && this.state.bird.birdImg}
              alt="Image of bird"
            ></img>
          </div>
          <div className="birdDetails">
            <h3 className="birdName">{bird.birdName && bird.birdName}</h3>
            <h3 className="birdEnglishName">
              {" "}
              {bird.birdEnglishName && bird.birdEnglishName}
            </h3>
            <h3 className="birdRarity"> {bird.birdRarity && bird.birdRarity}</h3>
            <h3 className="birdNocturnal">
              {" "}
              {bird.birdNocturnal && bird.birdNocturnal}
            </h3>
            <h3 className="birdTag"> {bird.birdTag && bird.birdTag}</h3>
            <h3 className="birdInfo"> {bird.birdInfo && bird.birdInfo}</h3>
          </div>
        </>
        }
      </div>
    );
  }
}

const mapStateToProps = (globalState) => {
  return {
    auth: globalState.auth,
    scrapbook: globalState.scrapbook,
  };
};
export default connect(mapStateToProps)(BirdProfile);
