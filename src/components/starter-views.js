/**
 *  This file contains the views that are displayed before and after the BCH wallet is initialized.
 */
import React from 'react'
import WaitingModal from './waiting-modal'
import AppBody from './app-body'

// This is rendered *before* the BCH wallet is initialized.
export function UninitializedView (props = {}) {
  // console.log('UninitializedView props: ', props)
  const { appData } = props

  const heading = 'Connecting to BCH blockchain...'

  return (
    <>
      <WaitingModal
        heading={heading}
        body={appData.modalBody}
        hideSpinner={appData.hideSpinner}
        denyClose={appData.denyClose}
      />
      {
				props.asyncInitFinished
				  ? <AppBody menuState={100} wallet={appData.wallet} appData={appData} />
				  : null
			}
    </>
  )
}

// This is rendered *after* the BCH wallet is initialized.
export function InitializedView (props) {
  const { appData } = props

  return (
    <>
      <br />
      <AppBody menuState={appData.menuState} appData={appData} />
    </>
  )
}
