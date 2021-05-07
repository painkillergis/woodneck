import { useEffect, createContext, useMemo, useReducer } from 'react'
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

const fetchAreas = (url) =>
  fetch(`https://woodneck-areas.painkillergis.com${url}`)

function ContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { targetAreaName } = state

  useQueryTargetAreaName(
    targetAreaName,
    useMemo(
      () => (targetAreaName) =>
        dispatch({ type: 'newTargetAreaName', payload: targetAreaName }),
      [dispatch],
    ),
  )

  useEffect(() => {
    fetchAreas('/v1.json')
      .then((response) => response.json())
      .then(({ areas }) =>
        dispatch({
          type: 'newAreaNames',
          payload: areas.map(({ displayName }) => displayName),
        }),
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
