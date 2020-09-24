import React from 'react'
import { connect } from 'react-redux'

class BirdProfile extends React.Component {
    state = {
        birdImg: '',
        birdName: '',
        birdEnglishName: '',
        birdRarity: '',
        birdNocturnal: false,
        birdTag: '',
        birdInfo: '',

    }

    componentDidMount() {
        this.getBirdProfile()
    }

    getBirdProfile = () => {
        getBird().then((bird) => {
            this.setState({
                bird: bird,
            })
        })
    }

    render() {
        const bird = this.state
        return (
          <>
          </>  
        )
    }
}

export default BirdProfile 