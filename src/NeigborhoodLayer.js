import { useMapEvents, GeoJSON } from 'react-leaflet'
import neighborhoods from './feature-collections/neighborhoods.json'
import booleanIntersects from '@turf/boolean-intersects'
import { point } from '@turf/turf'

function NeighborhoodLayer({ highlight, onNeighborhoodClicked }) {
  useMapEvents({
    click({ latlng: { lat, lng } }) {
      const clickPoint = point([lng, lat])
      const feature = neighborhoods.features.find((feature) =>
        booleanIntersects(feature, clickPoint),
      )
      if (feature) {
        onNeighborhoodClicked(feature.properties.BDNAME)
      }
    },
  })
  return neighborhoods.features.map((feature) => {
    const name = feature.properties.BDNAME
    const isHighlighted = name === highlight
    return (
      <GeoJSON
        key={`${name}${isHighlighted ? '-highlighted' : ''}`}
        data={feature}
        style={{
          fillColor: isHighlighted ? 'red' : 'white',
          weight: 2,
        }}
      />
    )
  })
}

export default NeighborhoodLayer
