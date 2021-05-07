import { useEffect, createContext, useReducer } from 'react'
import useQueryTargetAreaName from './useQueryTargetAreaName'

const context = createContext()

const initialState = {
  area: {
    features: [],
    type: 'FeatureCollection',
  },
  areaNames: [],
}

function reducer(state, action) {
  switch (action.type) {
    case 'newArea':
      return {
        ...state,
        area: action.payload,
      }
    case 'newAreaNames':
      return {
        ...state,
        areaNames: action.payload,
        targetAreaName: state.targetAreaName || action.payload[0],
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
  const { targetAreaName } = state

  useQueryTargetAreaName(targetAreaName, (targetAreaName) =>
    dispatch({ type: 'newTargetAreaName', payload: targetAreaName }),
  )

  useEffect(() => {
    fetch('/vectors.json')
      .then((response) => response.json())
      .then((areaNames) =>
        dispatch({ type: 'newAreaNames', payload: areaNames }),
      )
      .catch((error) => console.log('Failed to fetch area names', error))
  }, [])

  useEffect(() => {
    fetch(`/vectors/${targetAreaName}.json`)
      .then((response) => response.json())
      .then((area) => dispatch({ type: 'newArea', payload: area }))
      .catch((error) =>
        console.log('Failed to fetch area', targetAreaName, error),
      )
  }, [targetAreaName])

  return (
    <context.Provider
      value={{
        ...state,
        setTargetAreaName: (targetAreaName) =>
          dispatch({ type: 'newTargetAreaName', payload: targetAreaName }),
      }}
      children={children}
    />
  )
}

export default context
export { ContextProvider }
