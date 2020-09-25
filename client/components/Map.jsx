import React, {useState} from 'react'
import ReactMapGL, {GeolocateControl} from 'react-map-gl'
import { connect } from 'react-redux'
import 'mapbox-gl/dist/mapbox-gl.css'
import { logoutUser } from '../actions/auth'
import {  Link } from 'react-router-dom'

class Map extends React.Component {
  
  state = {
    latitude: -41.2930,
    longitude: 174.7839,
    width: '100vw',
    height: '90vh',
    zoom: 10
  }
  render() {
  const viewport = this.state
    // latitude: -41.2930,
    // longitude: 174.7839,
    // width: '100vw',
    // height: '90vh',
    // zoom: 10
  

  const { auth, logout, page } = this.props
  
  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={'pk.eyJ1IjoibWVldGpvaG5ncmF5IiwiYSI6ImNrZWJ5amJoYzAxeG4zNWs5ankxdHh5MWwifQ.7-Lg9dp4OdYmLML1jy5CDw'}
        mapStyle="mapbox://styles/meetjohngray/ckffrokn80cth19oe0ek66x9v"
      //   onViewportChange={viewport => {
      //     setViewport(viewport)
      //   }
      // }
      >
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
