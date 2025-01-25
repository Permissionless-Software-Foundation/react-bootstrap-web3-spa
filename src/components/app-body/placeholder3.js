/*
  This is a placeholder View
*/

// Global npm libraries
import React, { useEffect } from 'react'

function Placeholder3 (props) {
  useEffect(() => {
    console.log('Placeholder 3 loaded.')
  }, [])

  return (
    <>
      <p style={{ padding: '25px' }}>This is placeholder View #3</p>
    </>
  )
}

export default Placeholder3
