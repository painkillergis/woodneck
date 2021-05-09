import { useMapEvents, GeoJSON } from 'react-leaflet'
import booleanIntersects from '@turf/boolean-intersects'
import useLayer from './useLayer'

function AreaLayer({ highlight, onNeighborhoodClicked }) {
  const area = useLayer('neighborhoods')
  useMapEvents({
    click({ latlng: { lat, lng } }) {
      const feature = area.features.find((feature) =>
        booleanIntersects(feature, {
          type: 'Point',
          coordinates: [lng, lat],
        }),
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
