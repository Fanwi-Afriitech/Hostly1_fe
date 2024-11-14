import React from 'react'

const Errors = ({message}) => {
  return (
    <div className='alert alert-danger' role='alert'>
      {message}
    </div>
  )
}

export default Errors
