import { useEffect, createContext, useReducer } from 'react'

const context = createContext()

const initialState = {
  area: {
    features: [],
    type: 'FeatureCollection',
  },
  targetAreaName: 'minneapolis',
}

function reducer(state, action) {
  switch (action.type) {
    case 'newArea':
      return {
        ...state,
        area: action.payload,
      }
    case 'newTargetAreaName':
      return {
        ...state,
        targetAreaName: action.payload,
      }
    default:
      throw Error(`irreducable action type ${action.type}`)
  }
}

function ContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { area, targetAreaName } = state
  useEffect(() => {
    fetch(`/vectors/${targetAreaName}.json`)
      .then((response) => response.json())
      .then((area) => dispatch({ type: 'newArea', payload: area }))
      .catch((error) => console.log('Failed to fetch area', error))
  }, [targetAreaName])
  return (
    <context.Provider
      value={{
        area,
        setTargetAreaName: (targetAreaName) =>
          dispatch({ type: 'newTargetAreaName', payload: targetAreaName }),
      }}
      children={children}
    />
  )
}

export default context
export { ContextProvider }
