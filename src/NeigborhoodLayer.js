import { useMapEvents, GeoJSON } from 'react-leaflet'
import useNeighborhoods from './useNeighborhoods'
import booleanIntersects from '@turf/boolean-intersects'
import { point } from '@turf/turf'

function NeighborhoodLayer({ highlight, onNeighborhoodClicked }) {
  const neighborhoods = useNeighborhoods()
  useMapEvents({
    click({ latlng: { lat, lng } }) {
      const clickPoint = point([lng, lat])
      const feature = neighborhoods.features.find((feature) =>
        booleanIntersects(feature, clickPoint),
      )
      if (feature) {
        onNeighborhoodClicked(feature.properties.name)
      }
    },
  })
  return neighborhoods.features.map((feature) => {
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

export default NeighborhoodLayer
