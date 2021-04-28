function GamePanel({
  message,
  neighborhood,
  onHighlight,
  score,
  highlightWasUsed,
}) {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        margin: '1em',
        fontSize: '2em',
      }}
    >
      <div>
        Score: {score}
        {highlightWasUsed ? '*' : ''}
      </div>
      <div>Which neighborhood is {neighborhood}?</div>
      {message && <div>{message}</div>}
      <button onClick={onHighlight}>Show me!</button>
    </div>
  )
}

export default GamePanel
