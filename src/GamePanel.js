import { useContext } from 'react'
import context from './context'
import ShowMe from './ShowMe'

function GamePanel({
  highlightWasUsed,
  message,
  onHighlight,
  remaining,
  score,
  selectedNeighborhoodName,
}) {
  const { area, areaNames, setTargetAreaName } = useContext(context)
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        fontSize: '2em',
        margin: '0.5em',
        padding: '0.5em',
        borderRadius: '0.25em',
        backgroundColor: 'white',
        filter: 'drop-shadow(0.125em 0.125em 0.0625em #888)',
        zIndex: 1000,
      }}
    >
      <select
        value={area.name}
        onChange={(e) => setTargetAreaName(e.target.value)}
        style={{
          width: '100%',
        }}
      >
        {areaNames.map((areaName) => (
          <option value={areaName}>{areaName}</option>
        ))}
      </select>
      {remaining > 0 ? (
        <>
          <div>
            Score: {score}
            {highlightWasUsed ? '*' : ''}
            &nbsp; ({remaining} remaining)
          </div>
          <div>Which neighborhood is {selectedNeighborhoodName}?</div>
          {message && <div>{message}</div>}
          <ShowMe onClick={onHighlight} />
        </>
      ) : (
        <span>
          You win! Final score: {score}.
          {highlightWasUsed ? 'You used the Show me! button' : ''}
        </span>
      )}
    </div>
  )
}

export default GamePanel
