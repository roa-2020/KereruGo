import React, {useState} from 'react'
import ReactMapGL, {GeolocateControl} from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

export default function Map() {
  const [viewport, setViewport] = useState({
    latitude: -41.2930,
    longitude: 174.7839,
    width: '100vw',
    height: '100vh',
    zoom: 10
  })

  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={'pk.eyJ1IjoibWVldGpvaG5ncmF5IiwiYSI6ImNrZWJ5amJoYzAxeG4zNWs5ankxdHh5MWwifQ.7-Lg9dp4OdYmLML1jy5CDw'}
        mapStyle="mapbox://styles/meetjohngray/ckffrokn80cth19oe0ek66x9v"
        onViewportChange={viewport => {
          setViewport(viewport)
        }}
      >
        <GeolocateControl
          positionOptions={{enableHighAccuracy: true}}
          trackUserLocation={true}
        
        />

      </ReactMapGL>
    </div>
  )
}