import { useEffect, useMemo } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

function useQueryTargetAreaName(targetAreaName, onChange) {
  const history = useHistory()
  const { search } = useLocation()

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

  useEffect(() => onChange(queryTargetAreaName), [
    onChange,
    queryTargetAreaName,
  ])
}

export default useQueryTargetAreaName
