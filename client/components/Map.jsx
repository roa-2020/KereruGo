import React, {useState} from 'react'
import ReactMapGL, {GeolocateControl, Marker, Popup} from 'react-map-gl'
import { connect } from 'react-redux'
import 'mapbox-gl/dist/mapbox-gl.css'
import { logoutUser } from '../actions/auth'
import {  Link } from 'react-router-dom'
import { apiGetAllLocations } from '../apis/index'
import { receiveLocations } from '../actions/locations'
class Map extends React.Component {
  state= {
    viewport: {
      latitude: -41.294105529785156,
      longitude: 174.7752685546875,
      width: "100%",
      height: "100%",
      zoom: 15,
    },
    locations: []
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

  render() { 

  const { auth, logout, page } = this.props
  // console.log('Line 44:',this.state.locations)

  return (
    <div className='card is-centered mx-4'>
      <ReactMapGL
        {...this.state.viewport}
        mapboxApiAccessToken={'pk.eyJ1IjoibWVldGpvaG5ncmF5IiwiYSI6ImNrZWJ5amJoYzAxeG4zNWs5ankxdHh5MWwifQ.7-Lg9dp4OdYmLML1jy5CDw'}
        mapStyle="mapbox://styles/meetjohngray/ckfho52q60m0q19rriptc4a38"
        onViewportChange={this.viewportChange}
      >
         {/* {console.log('Line 53:', this.state.locations[0])} */}
        {/* <ul> */}
        {this.state.locations.map((location) => {
          return  (
            <Marker 

              key={location.locId}
              latitude={location.lat}
              longitude={location.long}
            >
              <button className="marker-btn" 
                onClick={e => {
                  e.preventDefault()
                  // setSelectedlocation(location)
                  // this.setState({
                  //   selectedlocation: location
                  // })
                  this.changelocation(location)
                }}
              >
                This is a button
                {this.state.location}
               </button>
            </Marker> 
        )})} 
        {/* </ul> */}
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

const mapStateToProps = ({ auth, locations }) => {
  return {
    auth,
    locations
  }
}

export default connect(mapStateToProps, mapDispatchToProps )(Map)
