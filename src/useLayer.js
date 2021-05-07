import { useContext } from 'react'
import context from './context'

function useLayer(name) {
  const { layers } = useContext(context)
  return layers[name] || { features: [], type: 'FeatureCollection' }
}

export default useLayer
