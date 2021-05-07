import { GeoJSON } from 'react-leaflet'
import useLayer from './useLayer'

const waterColor = '#addde5'

function ContextLayer({ name, ...props }) {
  const layer = useLayer(name)
  return layer.features.length ? <GeoJSON data={layer} {...props} /> : null
}

function LakesLayer() {
  return (
    <ContextLayer
      name="lakes"
      style={{ fillColor: waterColor, fillOpacity: 0.625, weight: 0 }}
    />
  )
}

function RiverBodiesLayer() {
  return (
    <ContextLayer
      name="riverbodies"
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
    <ContextLayer
      name="tnmfrc1"
      style={{ color: 'red', opacity: 0.5, weight: 1.5 }}
    />
  )
}

function TnmFrc23() {
  return (
    <ContextLayer
      name="tnmfrc23"
      style={{ color: 'orange', opacity: 1, weight: 1 }}
    />
  )
}

export { LakesLayer, RiverBodiesLayer, TnmFrc1, TnmFrc23 }
