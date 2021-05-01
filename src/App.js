import { useEffect, useMemo, useState } from 'react'
import { MapContainer } from 'react-leaflet'
import AutoFocus from './AutoFocus'
import AreaLayer from './AreaLayer'
import GamePanel from './GamePanel'
import {
  LakesLayer,
  RiverBodiesLayer,
  TnmFrc1,
  TnmFrc23,
} from './SimpleLayers'
import useArea from './useArea'

function random(elements) {
  return elements[Math.floor(Math.random() * elements.length)]
}

function App() {
  const area = useArea()
  const allNames = useMemo(
    () => area.features.map((feature) => feature.properties.name),
    [area],
  )
  const [remainingNames, setRemainingNames] = useState([])

  useEffect(() => {
    setRemainingNames(allNames)
  }, [allNames])

  const [highlight, setHighlight] = useState()
  const [highlightWasUsed, setHighlightWasUsed] = useState(false)
  const [message, setMessage] = useState()
  const [selectedNeighborhoodName, selectNeighborhoodName] = useState(
    random(remainingNames),
  )
  const [score, setScore] = useState(0)

  useEffect(() => {
    selectNeighborhoodName(random(remainingNames))
  }, [remainingNames])

  return (
    <>
      <MapContainer zoomSnap={false}>
        <GamePanel
          highlightWasUsed={highlightWasUsed}
          message={message}
          selectedNeighborhoodName={selectedNeighborhoodName}
          onHighlight={() => {
            setHighlight(selectedNeighborhoodName)
            setHighlightWasUsed(true)
          }}
          remaining={remainingNames.length}
          score={score}
        />
        <AutoFocus />
        <AreaLayer
          highlight={highlight}
          onNeighborhoodClicked={(name) => {
            if (name === selectedNeighborhoodName) {
              setRemainingNames((remainingNames) =>
                remainingNames.filter(
                  (remainingName) =>
                    remainingName !== selectedNeighborhoodName,
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
