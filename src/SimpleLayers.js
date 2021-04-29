import { useEffect, useState } from 'react'
import { GeoJSON, MapContainer } from 'react-leaflet'
import lakes from './feature-collections/lakes.json'
import riverBodies from './feature-collections/riverbodies.json'

const waterColor = '#addde5'

function LakesLayer() {
  return (
    <GeoJSON
      data={lakes}
      style={{ fillColor: waterColor, fillOpacity: 0.625, weight: 0 }}
    />
  )
}

function RiverBodiesLayer() {
  return (
    <GeoJSON
      data={riverBodies}
      style={{
        color: waterColor,
        fillColor: waterColor,
        fillOpacity: 0.75,
        weight: 0,
      }}
    />
  )
}

export { LakesLayer, RiverBodiesLayer }
