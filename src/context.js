import { useEffect, useState, createContext } from 'react'

const context = createContext()

function ContextProvider({ children }) {
  const [neighborhoods, setNeighborhoods] = useState({
    features: [],
    type: 'FeatureCollection',
  })
  useEffect(() => {
    fetch(
      'https://neighborhood-quiz.painkillergis.com/vectors/minneapolis.json',
    )
      .then((response) => response.json())
      .then((_neighborhoods) => setNeighborhoods(_neighborhoods))
      .catch((error) =>
        console.log('Failed to fetch neighborhoods', error),
      )
  }, [])
  return <context.Provider value={{ neighborhoods }} children={children} />
}

export default context
export { ContextProvider }
