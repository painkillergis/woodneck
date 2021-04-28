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
  const [neighborhood, setNeighborhood] = useState(
    randomNeighborhoodName(),
  )
  const [message, setMessage] = useState()
  return (
    <>
      <MapContainer>
        <GamePanel
          message={message}
          neighborhood={neighborhood}
          score={score}
        />
        <AutoFocus />
        <NeighborhoodLayer
          onNeighborhoodClicked={(name) => {
            if (name === neighborhood) {
              setScore((score) => score + 1)
              setMessage(`Nice, you found ${name}!`)
              setNeighborhood(randomNeighborhoodName())
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
