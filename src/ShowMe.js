import { useState } from 'react'

function ShowMe({ onClick }) {
  const [hover, setHover] = useState()
  return (
    <button
      style={{
        borderRadius: '0.5em',
        outline: 'none',
        border: 'none',
        padding: '0.25em',
        backgroundColor: hover ? '#CCC' : '#DDD',
        width: '100%',
        marginBottom: '-0.25em',
        cursor: 'pointer',
        filter: 'drop-shadow(0.125em 0.125em 0.0625em #888)',
      }}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover()}
    >
      Show me!
    </button>
  )
}

export default ShowMe
