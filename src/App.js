import { useState } from 'react'
import { MapContainer } from 'react-leaflet'
import AutoFocus from './AutoFocus'
import neighborhoods from './neighborhoods.json'
import NeighborhoodLayer from './NeigborhoodLayer'
import GamePanel from './GamePanel'

function randomNeighborhoodName() {
  return neighborhoods.features[
    Math.floor(Math.random() * neighborhoods.features.length)
  ].properties.BDNAME
}

function App() {
  const [score, setScore] = useState(0)
  const [highlight, setHighlight] = useState()
  const [neighborhood, setNeighborhood] = useState(
    randomNeighborhoodName(),
  )
  const [message, setMessage] = useState()
  const [highlightWasUsed, setHighlightWasUsed] = useState(false)
  return (
    <>
      <MapContainer>
        <GamePanel
          message={message}
          neighborhood={neighborhood}
          onHighlight={() => {
            setHighlight(neighborhood)
            setHighlightWasUsed(true)
          }}
          score={score}
          highlightWasUsed={highlightWasUsed}
        />
        <AutoFocus />
        <NeighborhoodLayer
          highlight={highlight}
          onNeighborhoodClicked={(name) => {
            if (name === neighborhood) {
              setHighlight()
              setMessage(`Nice, you found ${name}!`)
              setNeighborhood(randomNeighborhoodName())
              setScore((score) => score + 1)
            } else {
              setMessage(`Sorry, that neighborhood is ${name}!`)
            }
          }}
        />
      </MapContainer>
    </>
  )
}

export default App
