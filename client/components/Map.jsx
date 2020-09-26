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
    // locations: []
  }

  componentDidMount() {
    apiGetAllLocations()
   
    .then(locations => (this.props.dispatch(receiveLocations(locations))))
    // console.log(locations)
    // (locations => { 
    //   this.setState({locations: locations})})
    .catch((err) => console.log(err))
  }

  viewportChange= (viewport) => {
    this.setState({viewport})
  }

  render() { 

  const { auth, logout, page } = this.props
  // console.log('Line 44:',this.state.locations)

 
//  const locations = [
//       "{birdId: 10, lat: -41.296926, locId: 1, long: 174.7…}",
//       "{birdId: 3, lat: -41.297769, locId: 2, long: 174.77…}",
//       "{birdId: 13, lat: -41.296201, locId: 3, long: 174.7…}"
//     ]
  
  return (
    <div className='card is-centered mx-4'>
      <ReactMapGL
        {...this.state.viewport}
        mapboxApiAccessToken={'pk.eyJ1IjoibWVldGpvaG5ncmF5IiwiYSI6ImNrZWJ5amJoYzAxeG4zNWs5ankxdHh5MWwifQ.7-Lg9dp4OdYmLML1jy5CDw'}
        mapStyle="mapbox://styles/meetjohngray/ckfho52q60m0q19rriptc4a38"
        onViewportChange={this.viewportChange}
      >
         {/* {console.log('Line 53:', locations)} */}
        
        {/* {locations.map((location) => (
            // <li><h1 className='title'>location.locId</h1></li>
            <Marker 
              key={location.lociId}
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
               </button>
            </Marker> */}
         {/* ))}  */}
        
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

export default connect(mapStateToProps, mapDispatchToProps)(Map)
