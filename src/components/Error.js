import React from 'react'

export default ({message, onClick}) => {
  if (message.length === 0) {
    return null
  }
  return (
    <div className="alert alert-danger text-light cs-error cs-empty" role="alert" onClick={onClick}>
      <strong>{message}</strong>
    </div>
  )
}
