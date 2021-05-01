import { useMapEvents, GeoJSON } from 'react-leaflet'
import useArea from './useArea'
import booleanIntersects from '@turf/boolean-intersects'
import { point } from '@turf/turf'

function AreaLayer({ highlight, onNeighborhoodClicked }) {
  const area = useArea()
  useMapEvents({
    click({ latlng: { lat, lng } }) {
      const clickPoint = point([lng, lat])
      const feature = area.features.find((feature) =>
        booleanIntersects(feature, clickPoint),
      )
      if (feature) {
        onNeighborhoodClicked(feature.properties.name)
      }
    },
  })
  return area.features.map((feature) => {
    const name = feature.properties.name
    const isHighlighted = name === highlight
    return (
      <GeoJSON
        key={`${name}${isHighlighted ? '-highlighted' : ''}`}
        data={feature}
        style={{
          fillColor: isHighlighted ? 'red' : 'white',
          weight: 1.5,
          color: 'black',
          filter: 'blur(32px)',
          opacity: 1,
        }}
      />
    )
  })
}

export default AreaLayer
