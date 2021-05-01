import { useEffect, createContext, useReducer, useMemo } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

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

  const history = useHistory()
  const { search } = useLocation()

  const { targetAreaName } = state

  useEffect(() => {
    if (!targetAreaName) return
    history.push({
      search: new URLSearchParams([
        ['areaName', targetAreaName],
      ]).toString(),
    })
  }, [history, targetAreaName])

  const queryTargetAreaName = useMemo(
    () => new URLSearchParams(search).get('areaName'),
    [search],
  )

  useEffect(
    () =>
      dispatch({
        type: 'newTargetAreaName',
        payload: queryTargetAreaName,
      }),
    [queryTargetAreaName],
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
    fetch(`/vectors/${targetAreaName || queryTargetAreaName}.json`)
      .then((response) => response.json())
      .then((area) => dispatch({ type: 'newArea', payload: area }))
      .catch((error) =>
        console.log('Failed to fetch area', targetAreaName, error),
      )
  }, [targetAreaName, queryTargetAreaName])

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
