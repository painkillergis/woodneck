function GamePanel({ message, neighborhood, score }) {
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
      <div>Score: {score}</div>
      <div>Which neighborhood is {neighborhood}?</div>
      {message && <div>{message}</div>}
    </div>
  )
}

export default GamePanel
