import { useContext } from 'react'
import { GeoJSON } from 'react-leaflet'
import context from './context'
import riverBodies from './feature-collections/riverbodies.json'
import tnmfrc1 from './feature-collections/tnmfrc1.json'
import tnmfrc23 from './feature-collections/tnmfrc23.json'

const waterColor = '#addde5'

function useLayer(name) {
  const { layers } = useContext(context)
  return layers[name]
}

function LakesLayer() {
  const layer = useLayer('lakes')
  return layer ? (
    <GeoJSON
      data={layer}
      style={{ fillColor: waterColor, fillOpacity: 0.625, weight: 0 }}
    />
  ) : null
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

function TnmFrc1() {
  return (
    <GeoJSON
      data={tnmfrc1}
      style={{ color: 'red', opacity: 0.5, weight: 1.5 }}
    />
  )
}

function TnmFrc23() {
  return (
    <GeoJSON
      data={tnmfrc23}
      style={{ color: 'orange', opacity: 1, weight: 1 }}
    />
  )
}

export { LakesLayer, RiverBodiesLayer, TnmFrc1, TnmFrc23 }
