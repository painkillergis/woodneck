import { useMap } from 'react-leaflet'
import { useEffect } from 'react'
import bbox from '@turf/bbox'
import useNeighborhoods from './useNeighborhoods'

const AutoFocus = () => {
  const map = useMap()
  const neighborhoods = useNeighborhoods()
  useEffect(() => {
    if (neighborhoods.features.length < 1) return
    const [left, bottom, right, top] = bbox(neighborhoods)
    const leafletBounds = [
      [bottom, left],
      [top, right],
    ]
    map.fitBounds(leafletBounds)
    const onResize = () =>
      setTimeout(() => map.fitBounds(leafletBounds), 125)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [map, neighborhoods])
  return null
}

export default AutoFocus
