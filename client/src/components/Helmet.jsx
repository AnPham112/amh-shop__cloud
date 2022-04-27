import React from 'react'

function Helmet(props) {
  document.title = 'AMH - ' + props.title

  return (
    <div>{props.children}</div>
  )
}

export default Helmet