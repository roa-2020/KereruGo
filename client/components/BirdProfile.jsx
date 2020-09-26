import React from 'react'
import { connect } from 'react-redux'

import { apiGetBirdById } from "../apis/index"
// import { receiveScrapbook } from '../actions/scrapbook'

  class BirdProfile extends React.Component {
    state = {
      bird: {}
    }

   componentDidMount() {
    apiGetBirdById(this.props.match.params.id)
      .then(bird => {
        console.log(bird)
        // this.props.dispatch(receiveScrapbook(scrapbook))
        this.setState({
          bird: bird
        })
      })
   }

    render() {
      const bird = this.state.bird
        return (
          <>
            <div 
            id="bird-profile"
            className="container content is-full has-background-primary">
                <div className="bird-profile-img">
                    <img src={this.state.bird.birdImg && this.state.bird.birdImg} alt="Image of bird"
                    ></img>
                </div>
                <h3 className="birdName">{bird.birdName && bird.birdName}
                </h3>
                <h3 className="birdEnglishName"> {bird.birdEnglishName && bird.birdEnglishName}
                </h3>
                <h3 className="birdRarity"> {bird.birdRarity && bird.birdRarity}
                </h3>
                <h3 className="birdNocturnal"> {bird.birdNocturnal && bird.birdNocturnal}
                </h3>
                <h3 className="birdTag"> {bird.birdTag && bird.birdTag}
                </h3>
                <h3 className="birdInfo"> {bird.birdInfo && bird.birdInfo}</h3>
              </div>
          </>  
        )
    }
}

const mapStateToProps = (globalState) => {
  return {
    auth: globalState.auth,
    scrapbook: globalState.scrapbook
}
}
export default connect(mapStateToProps)(BirdProfile)
