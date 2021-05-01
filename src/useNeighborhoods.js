import { useContext } from 'react'
import context from './context'

function useNeighborhoods() {
  const { neighborhoods } = useContext(context)
  return neighborhoods
}

export default useNeighborhoods
