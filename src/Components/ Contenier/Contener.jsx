import React from 'react'

function Contener({Children}) {
  return (
    <div className='w-full max-w-7xl ms-auto px-4'>{Children}  </div>
  )
}

export default Contener
