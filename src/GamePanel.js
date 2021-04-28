function GamePanel({
  highlightWasUsed,
  message,
  neighborhood,
  onHighlight,
  remaining,
  score,
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
      {remaining > 0 ? (
        <>
          <div>
            Score: {score}
            {highlightWasUsed ? '*' : ''}
            &nbsp; ({remaining} remaining)
          </div>
          <div>Which neighborhood is {neighborhood}?</div>
          {message && <div>{message}</div>}
          <button onClick={onHighlight}>Show me!</button>
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
