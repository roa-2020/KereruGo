import React from 'react'
import { connect } from 'react-redux'
import { apiGetOneBird } from '../apis'

class BirdProfile extends React.Component {
   state = {
    //    birdImg: '',
    //    birdName: '',
    //    birdEnglishName: '',
    //    birdRarity: '',
    //    birdNocturnal: false,
    //    birdTag: '',
    //    birdInfo: '',
        bird: {}
   }

   componentDidMount() {
    apiGetOneBird(3)
    .then((bird) => {
        this.setState({
            bird
        })
    })
   }

    render() {
        apiGetOneBird(3)
        .then(bird => {
            console.log(bird)
        })

        return (
          <>
          <div className="birdProfile">
            <div className="birdImg">
                <img src={this.state.birdImg} alt="Image of bird"/>
            </div>
            <p className="birdName">{this.state.birdName}
            </p>
            <p className="birdEnglishName"> {this.state.birdEnglishName}
            </p>
            <p className="birdRarity"> {this.state.birdRarity}
            </p>
            <p className="birdNocturnal"> {this.state.birdNocturnal}
            </p>
            <p className="birdTag"> {this.state.birdTag}
            </p>
            <p className="birdInfo"> {this.state.birdInfo}</p>

          </div>
          </>  
        )
    }
}

const mapStateToProps = ({auth}) => {
        return {
          auth
        }
      }


export default connect(mapStateToProps)(BirdProfile)
