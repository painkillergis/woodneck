import { useEffect, useState } from 'react'
import { MapContainer } from 'react-leaflet'
import AutoFocus from './AutoFocus'
import NeighborhoodLayer from './NeigborhoodLayer'
import GamePanel from './GamePanel'
import {
  LakesLayer,
  RiverBodiesLayer,
  TnmFrc1,
  TnmFrc23,
} from './SimpleLayers'
import useNeighborhoods from './useNeighborhoods'

function randomNeighborhood(neighborhoods) {
  return neighborhoods[Math.floor(Math.random() * neighborhoods.length)]
}

function App() {
  const neighborhoodsFeatureCollection = useNeighborhoods()

  const [neighborhoods, setNeighborhoods] = useState([])

  useEffect(() => {
    setNeighborhoods(
      neighborhoodsFeatureCollection.features.map(
        (feature) => feature.properties.name,
      ),
    )
  }, [neighborhoodsFeatureCollection])

  const [highlight, setHighlight] = useState()
  const [highlightWasUsed, setHighlightWasUsed] = useState(false)
  const [message, setMessage] = useState()
  const [neighborhood, setNeighborhood] = useState(
    randomNeighborhood(neighborhoods),
  )
  const [score, setScore] = useState(0)

  useEffect(() => {
    setNeighborhood(randomNeighborhood(neighborhoods))
  }, [neighborhoods])

  return (
    <>
      <MapContainer>
        <GamePanel
          highlightWasUsed={highlightWasUsed}
          message={message}
          neighborhood={neighborhood}
          onHighlight={() => {
            setHighlight(neighborhood)
            setHighlightWasUsed(true)
          }}
          remaining={neighborhoods.length}
          score={score}
        />
        <AutoFocus />
        <NeighborhoodLayer
          highlight={highlight}
          onNeighborhoodClicked={(name) => {
            if (name === neighborhood) {
              setNeighborhoods((_neighborhoods) =>
                _neighborhoods.filter(
                  (_neighborhood) => _neighborhood !== neighborhood,
                ),
              )
              setHighlight()
              setMessage(`Nice, you found ${name}!`)
              setScore((score) => score + 1)
            } else {
              setMessage(`Sorry, that neighborhood is ${name}!`)
            }
          }}
        />
        <LakesLayer />
        <RiverBodiesLayer />
        <TnmFrc1 />
        <TnmFrc23 />
      </MapContainer>
    </>
  )
}

export default App
