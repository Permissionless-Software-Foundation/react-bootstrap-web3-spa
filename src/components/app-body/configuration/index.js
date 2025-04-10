/*
 This component is a View that allows the user to handle configuration
 settings for the app.
*/

// Global npm libraries
import React from 'react'
import ServerSelectView from './select-server-view'

function ConfigurationView (props) {
  const { appData } = props

  return (
    <>
      <ServerSelectView appData={appData} />
    </>
  )
}

export default ConfigurationView
