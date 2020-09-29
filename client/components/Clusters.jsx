import React, { useRef } from "react"
import ReactMapGL, { GeolocateControl, Marker, Popup } from "react-map-gl"
import useSuperCluster from 'use-supercluster'
import "mapbox-gl/dist/mapbox-gl.css"

function Clusters (props) {
  const{locations, mapRef, viewport} = props

  // Prepare data for supercluster
  const points = locations.map(location => ( {
    type: "Feature",
    properties: {
      cluster: false,
      locationID: location.locId
    },
    geometry: {type: "Point", coordinates: [location.long, location.lat]}
  }))
  // console.log(points)

    const getBoundsArray = () => {
      const bounds = mapRef.current
      .getMap()
      .getBounds()
      const {_ne, _sw} = bounds
      return [_sw.lng, _sw.lat, _ne.lng, _ne.lat]
    }

    const bounds = mapRef.current 
    ? getBoundsArray()
    : null
    // Get Clusters
    const { clusters } = useSuperCluster({
      points,
      zoom: viewport.zoom,
      bounds,
      options: { radius: 75, maxZoom: 20}
  })
  console.log('clusters', clusters)
  return null
}

export default Clusters