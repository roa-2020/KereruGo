import React, { useRef } from "react"
import ReactMapGL, { Marker, Popup } from "react-map-gl"
import useSuperCluster from 'use-supercluster'
// import "mapbox-gl/dist/mapbox-gl.css"

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
  
  return (
  clusters.map(cluster => {
    // Every  cluster point has coordinates
    const [longitude, latitude] = cluster.geometry.coordinates
    // A point is either a cluster or a single bird
    const {
      cluster: isCluster,
      point_count: pointCount
    } = cluster.properties

    // Show a cluster
    if (isCluster) {
      console.log('cluster')
      return (
        <Marker
        key={`cluster-${cluster.id}`}
        latitude={latitude}
        longitude={longitude}
      >
        <div
          className="cluster-marker"
          style={{
            width: `${10 + (pointCount / points.length) * 20}px`,
            height: `${10 + (pointCount / points.length) * 20}px`
          }}
        >
          {pointCount}
        </div>
      </Marker>
      )
    }
    console.log('spot')
    return (
      // null
      
      <Marker
        className="marker-btn"
        key={location.locId}
        latitude={Number(location.lat)}
        longitude={Number(location.long)}
      >
        <img src="/images/mystery-bird.png" onClick={popupFunc} />
      </Marker>
    )
  })
 )
}

export default Clusters