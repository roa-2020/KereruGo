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
    const audio = new Audio(this.state.bird.birdAudio);
    
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
    
    let rarity = ''
      if(this.state.bird.birdRarity == 'common'){
      rarity = 'Common'
    } else if (bird.birdRarity == 'vulnerable'){
      rarity = 'Vulnerable'
    } else if (bird.birdRarity == 'extinct'){
      rarity = 'Extinct'
    } else {
      rarity = 'Endangered'
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
                &nbsp;
                &nbsp;
                  <i className="fas fa-volume-up"
                    onClick = {() => {
                      audio.play()
                    }}
                  ></i>
              </h2>
              <div className="birdIcons mb-4">
                <div className="icon-group">
                  {/* check if this is back to front */}
                  {bird.birdNocturnal === 0 ? <i className="fas fa-sun mb-3"></i> : <i className="fas fa-moon mb-3"></i>}
                  <p>{bird.birdNocturnal === 0 ? 'Noctural' : 'Diurnal' }</p>
                </div>
                 <div className="icon-group">
                  {rarityIcon}
                  <p>{rarity}</p>
                </div>
                <div className="icon-group">
                  <i className="fab fa-pagelines mb-3"></i>
                  <p>Forest</p>
                </div>
              </div>

              <p className="birdTag"> {bird.birdTag && bird.birdTag}</p>
             
             {/* Add a modal to display more info */}
            {/* <div className="modal is-active">
              <div className="modal-background"></div>
              <div className="modal-content">
                <p className="birdInfo"> {bird.birdInfo && bird.birdInfo}</p>
              </div>
              <button className="modal-close is-large" aria-label="close"></button>
            </div> */}
        </div>
           </>
        )}
        {/* check this works on iphone */}
        <BackLink
        inline='inline'And 
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
