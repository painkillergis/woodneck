import { useEffect, createContext, useMemo, useReducer } from 'react'
import useQueryTargetAreaName from './useQueryTargetAreaName'

const context = createContext()

const initialState = {
  area: {
    features: [],
    type: 'FeatureCollection',
  },
  collections: [],
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
    case 'newCollections':
      return {
        ...state,
        collections: action.payload,
        targetAreaName: state.targetAreaName || action.payload[0].name,
      }
    default:
      throw Error(`irreducable action type ${action.type}`)
  }
}

const fetchAreas = (url) =>
  fetch(`https://woodneck-areas.painkillergis.com${url}`)

function ContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { collections, targetAreaName } = state
  const collection = useMemo(
    () => collections.find(({ name }) => name === targetAreaName),
    [collections, targetAreaName],
  )

  useQueryTargetAreaName(
    targetAreaName,
    useMemo(
      () => (targetAreaName) =>
        dispatch({ type: 'newTargetAreaName', payload: targetAreaName }),
      [dispatch],
    ),
  )

  useEffect(() => {
    fetchAreas('/v2.json')
      .then((response) => response.json())
      .then(({ collections }) =>
        dispatch({
          type: 'newCollections',
          payload: collections,
        }),
      )
      .catch((error) => console.log('Failed to fetch area names', error))
  }, [])

  useEffect(() => {
    if (!collection) return
    fetchAreas(`/${collection.neighborhoods}`)
      .then((response) => response.json())
      .then((area) => dispatch({ type: 'newArea', payload: area }))
      .catch((error) =>
        console.log('Failed to fetch area', collection.name, error),
      )
  }, [collection, targetAreaName])

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
