import { useContext } from 'react'
import context from './context'

function useArea() {
  const { area } = useContext(context)
  return area
}

export default useArea
