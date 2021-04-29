import { useEffect, useState } from 'react'
import { MapContainer } from 'react-leaflet'
import AutoFocus from './AutoFocus'
import neighborhoodsFeatureCollection from './feature-collections/neighborhoods.json'
import NeighborhoodLayer from './NeigborhoodLayer'
import GamePanel from './GamePanel'
import { LakesLayer, RiverBodiesLayer } from './SimpleLayers'

function randomNeighborhood(neighborhoods) {
  return neighborhoods[Math.floor(Math.random() * neighborhoods.length)]
}

function App() {
  const [neighborhoods, setNeighborhoods] = useState(
    neighborhoodsFeatureCollection.features.map(
      (feature) => feature.properties.BDNAME,
    ),
  )

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
      </MapContainer>
    </>
  )
}

export default App
