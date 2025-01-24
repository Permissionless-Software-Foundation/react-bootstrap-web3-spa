/*
  This is a placeholder View
*/

// Global npm libraries
import React, { useEffect } from 'react'

function Placeholder2 (props) {
  useEffect(() => {
    console.log('Placeholder 2 loaded.')
  }, [])

  return (
    <>
      <p style={{ padding: '25px' }}>This is placeholder View #2</p>
    </>
  )
}

export default Placeholder2
