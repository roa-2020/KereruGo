import React, {useState} from 'react'
import ReactMapGL, {GeolocateControl} from 'react-map-gl'
import { connect } from 'react-redux'
import 'mapbox-gl/dist/mapbox-gl.css'
import { logoutUser } from '../actions/auth'
import {  Link } from 'react-router-dom'
import NavLink from './NavLink'

class Map extends React.Component {
  state= {
    viewport: {
      latitude: -41.294105529785156,
      longitude: 174.7752685546875,
      width: "100%",
      height: "100%",
      zoom: 15,
    }
  }
  
  viewportChange= (viewport) => {
    this.setState({viewport})
  } 

  render() {
    // const viewport = this.state
    // latitude: -41.2930,
    // longitude: 174.7839,
    // width: '100vw',
    // height: '90vh',
    // zoom: 10
  // const setViewport = this.state

  const { auth, logout, page } = this.props
   
  return (
    <div className='card is-centered mx-4'>
      <NavLink />

      <ReactMapGL
        {...this.state.viewport}
        mapboxApiAccessToken={'pk.eyJ1IjoibWVldGpvaG5ncmF5IiwiYSI6ImNrZWJ5amJoYzAxeG4zNWs5ankxdHh5MWwifQ.7-Lg9dp4OdYmLML1jy5CDw'}
        mapStyle="mapbox://styles/meetjohngray/ckfho52q60m0q19rriptc4a38"
        onViewportChange={this.viewportChange}
      >
        <GeolocateControl
          positionOptions={{enableHighAccuracy: true}}
          trackUserLocation={true}
          auto={true}
        />
      </ReactMapGL>
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
