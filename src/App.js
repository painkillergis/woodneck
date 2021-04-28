import { MapContainer, GeoJSON } from 'react-leaflet'
import AutoFocus from './AutoFocus'
import neighborhoods from './neighborhoods.json'

function App() {
  return (
    <MapContainer>
      <AutoFocus />
      <GeoJSON data={neighborhoods} />
    </MapContainer>
  )
}

export default App
