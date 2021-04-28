import { useMapEvents, GeoJSON } from 'react-leaflet'
import neighborhoods from './neighborhoods.json'
import booleanIntersects from '@turf/boolean-intersects'
import { point } from '@turf/turf'

function NeighborhoodLayer({ onNeighborhoodClicked }) {
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
  return <GeoJSON data={neighborhoods} />
}

export default NeighborhoodLayer
