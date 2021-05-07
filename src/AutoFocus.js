import { useMap } from 'react-leaflet'
import { useEffect } from 'react'
import bbox from '@turf/bbox'
import buffer from '@turf/buffer'
import envelope from '@turf/envelope'
import useLayer from './useLayer'

const AutoFocus = () => {
  const map = useMap()
  const area = useLayer('neighborhoods')
  useEffect(() => {
    if (area.features.length < 1) return
    const [left, bottom, right, top] = bbox(
      buffer(envelope(area), 1, { units: 'miles' }),
    )
    const leafletBounds = [
      [bottom, left],
      [top, right],
    ]
    map.fitBounds(leafletBounds)
    const onResize = () =>
      setTimeout(() => map.fitBounds(leafletBounds), 125)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [map, area])
  return null
}

export default AutoFocus
