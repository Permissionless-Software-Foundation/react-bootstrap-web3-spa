/*
  This is an SPA that creates a template for future BCH web3 apps.
*/

// Global npm libraries
import React, { useEffect, useCallback } from 'react'

// Local libraries
import './App.css'
import LoadScripts from './components/load-scripts'
import AsyncLoad from './services/async-load'
import SelectServerButton from './components/app-body/servers/select-server-button'
import Footer from './components/footer'
import NavMenu from './components/nav-menu'
import useAppState from './hooks/state'
import { UninitializedView, InitializedView } from './components/starter-views'

function App (props) {
  // Load all the app state into a single object that can be passed to child
  // components.
  const appData = useAppState()

  // Add a new line to the waiting modal.
  const addToModal = useCallback((inStr, appData) => {
    // console.log('addToModal() inStr: ', inStr)

    appData.setModalBody(prevBody => {
      // console.log('prevBody: ', prevBody)
      prevBody.push(inStr)
      return prevBody
    })
  }, [])
  /** Load all required data before component start. */
  useEffect(() => {
    async function asyncEffect () {
      console.log('asyncInitStarted: ', appData.asyncInitStarted)

      if (!appData.asyncInitStarted) {
        try {
          // Instantiate the async load object.
          const asyncLoad = new AsyncLoad()
          appData.setAsyncInitStarted(true)

          addToModal('Loading minimal-slp-wallet', appData)
          appData.setDenyClose(true)

          await asyncLoad.loadWalletLib()
          // console.log('Wallet: ', Wallet)

          addToModal('Getting alternative servers', appData)
          const gistServers = await asyncLoad.getServers()
          appData.setServers(gistServers)
          // console.log('servers: ', servers)

          addToModal('Initializing wallet', appData)
          console.log(`Initializing wallet with back end server ${appData.serverUrl}`)

          const walletTemp = await asyncLoad.initWallet(appData.serverUrl)
          appData.setWallet(walletTemp)

          // Update state
          appData.setShowStartModal(false)
          appData.setDenyClose(false)

          // Update the startup state.
          appData.setAsyncInitFinished(true)
          appData.setAsyncInitSucceeded(true)
          console.log('App.js useEffect() startup finished successfully')
        } catch (err) {
          const errModalBody = [
            `Error: ${err.message}`,
            'Try selecting a different back end server using the drop-down menu at the bottom of the app.'
          ]
          appData.setModalBody(errModalBody)

          // Update Modal State
          appData.setHideSpinner(true)
          appData.setShowStartModal(true)
          appData.setDenyClose(false)

          // Update the startup state.
          appData.setAsyncInitFinished(true)
          appData.setAsyncInitSucceeded(false)
        }
      }
    }
    asyncEffect()
  }, [appData, addToModal])

  return (
    <>
      <LoadScripts />
      <NavMenu appData={appData} />
      {/** Define View to show */}
      {
        appData.showStartModal
          ? (<UninitializedView appData={appData} />)
          : (<InitializedView menuState={appData.menuState} appData={appData} />)
      }

      <SelectServerButton appData={appData} />
      <Footer appData={appData} />
    </>
  )
}

export default App
