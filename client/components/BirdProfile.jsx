import React from 'react'
import { connect } from 'react-redux'
import { apiGetOneBird } from '../apis'
import { receiveBirdProfile } from '../actions/bird_profile'

class BirdProfile extends React.Component {
   componentDidMount() {
     console.log("This is hard")
    apiGetOneBird(3)
    .then(bird_profile => this.props.dispatch(receiveBirdProfile(bird_profile)))
   }

    render() {
      console.log("Stevie is awesome!", this.props)
        return (
          <>
            <div 
            id="bird-profile"
            className="container content is-full has-background-primary">
                <h1 className="has-text-white pt-3 has-text-centered">
                  <i>Kererū Go!</i>
                </h1>
             
                {this.props.birdId.map((item) => {
                  return (
                    <>
                <div key={item.bird_profile}
                className="bird-profile-img">
                    <img src={item.birdImg} alt="Image of bird"
                    ></img>
                </div>
                
                <h3 className="birdName">{item.birdName}
                </h3>
                <h3 className="birdEnglishName"> {item.birdEnglishName}
                </h3>
                <h3 className="birdRarity"> {item.birdRarity}
                </h3>
                <h3 className="birdNocturnal"> {item.birdNocturnal}
                </h3>
                <h3 className="birdTag"> {item.birdTag}
                </h3>
                <h3 className="birdInfo"> {item.birdInfo}</h3>
                </>
                  )
                  })}
              </div>
          </>  
        )
    }
}

const mapStateToProps = ({auth}) => {
        return {
          auth,
          //  bird_profile
          //check return statement - use scrapbook.jsx for reference
      }
    }


export default connect(mapStateToProps)(BirdProfile)
