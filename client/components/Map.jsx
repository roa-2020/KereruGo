import React, {useEffect} from 'react'
import ReactMapGL, {GeolocateControl, Marker, Popup} from 'react-map-gl'
import { connect } from 'react-redux'
import 'mapbox-gl/dist/mapbox-gl.css'
import { logoutUser } from '../actions/auth'
import {  Link } from 'react-router-dom'
import { apiGetAllLocations } from '../apis/index'
import { receiveLocations } from '../actions/locations'
import NavLink from './NavLink'

class Map extends React.Component {
  state= {
    viewport: {
      latitude: -41.294105529785156,
      longitude: 174.7752685546875,
      width: "100%",
      height: "100%",
      zoom: 15,
    },
    locations: [],
    selectedLocation: null
  }

  componentDidMount() {
    apiGetAllLocations()
   
    // .then(locations => (this.props.dispatch(receiveLocations(locations))))
    // console.log(locations)
    .then(locations => { 
      this.setState({locations: locations})})
    .catch((err) => console.log(err))
  }

  viewportChange= (viewport) => {
    this.setState({viewport})
  }

  // changeLocation = (location) => {
  //   console.log(location)
  //   this.setState({selectedLocation: location})
  // }

  setSelectedLocation = object => {
    this.setState({
       selectedLocation: object
    });
  };

  closePopup = () => {
    this.setState({
      selectedLocation: null
    }); 
  };
  
  render() { 
  // const selectedLocation = this.state.selectedLocation
  // console.log(selectedLocation)
  const { auth, logout, page } = this.props
  // console.log('Line 44:',this.state.locations)

  return (
    <div className='card is-centered mx-4'>
      <NavLink />

      <ReactMapGL
        {...this.state.viewport}
        mapboxApiAccessToken={'pk.eyJ1IjoibWVldGpvaG5ncmF5IiwiYSI6ImNrZWJ5amJoYzAxeG4zNWs5ankxdHh5MWwifQ.7-Lg9dp4OdYmLML1jy5CDw'}
        mapStyle="mapbox://styles/meetjohngray/ckfk9geqz34xv19po854t66dz"
        onViewportChange={this.viewportChange}
      >
         
        {this.state.locations.map((location) => {
          return  (
            <Marker className="marker-btn"
              key={location.locId}
              latitude={location.lat}
              longitude={location.long}
            >
            
                {/* <img src={location.birdImg} /> */}
                {/* <p><i className="fas fa-kiwi-bird" 
                  onClick={() =>
                    this.setSelectedLocation(location)
                  }>
                </i>bird</p> */}
                <img src="/images/hihi.png" 
                  onClick={() =>
                    this.setSelectedLocation(location)
                  }/>
            </Marker> 
        )})}

        {this.state.selectedLocation !== null ? (
          <Popup
             latitude={this.state.selectedLocation.lat} 
             longitude={this.state.selectedLocation.long}
             onClose={this.closePopup}
          >
              <div>
                <img src={this.state.selectedLocation.birdImg} />
                <p className="title is-5">You found a {this.state.selectedLocation.birdName}!</p>
                <p className="title is-6"><a>Find out more</a></p>
                {/* <p className="subtitle is-6">{selectedScrap.description}</p> */}
             </div> 
          </Popup>
        ) : null}
        
        <GeolocateControl
          positionOptions={{enableHighAccuracy: true}}
          trackUserLocation={true}
          auto={true}
        />
      </ReactMapGL>
      <Link to='/' className="button is-rounded" onClick={() => logout()}>Logout</Link>
    </div>
  )}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    logout: () => {
      const confirmSuccess = () => ownProps.history.push('/')
      dispatch(logoutUser(confirmSuccess))
    },
    page: () => {
      dispatch(togglePage("list", 1))
    }
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    auth,
  }
}

export default connect(mapStateToProps, mapDispatchToProps )(Map)
