import { useEffect, createContext, useReducer } from 'react'

const context = createContext()

const initialState = {
  area: {
    features: [],
    type: 'FeatureCollection',
  },
}

function reducer(state, action) {
  switch (action.type) {
    case 'newArea':
      return {
        ...state,
        area: action.payload,
      }
    default:
      throw Error(`irreducable action type ${action.type}`)
  }
}

function ContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { area } = state
  useEffect(() => {
    fetch('/vectors/minneapolis.json')
      .then((response) => response.json())
      .then((area) => dispatch({ type: 'newArea', payload: area }))
      .catch((error) => console.log('Failed to fetch area', error))
  }, [])
  return (
    <context.Provider
      value={{ neighborhoods: area }}
      children={children}
    />
  )
}

export default context
export { ContextProvider }
