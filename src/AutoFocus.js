import { useMap } from 'react-leaflet'
import { useEffect } from 'react'
import neighborhoods from './neighborhoods.json'
import bbox from '@turf/bbox'

const AutoFocus = () => {
  const map = useMap()
  useEffect(() => {
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
  }, [map])
  return null
}

export default AutoFocus
