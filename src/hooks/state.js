import { useState } from 'react'
import { useQueryParam, StringParam } from 'use-query-params'

function useAppState () {
  // Get the CashStack URL from query parameter or use default
  let [restURL] = useQueryParam('restURL', StringParam)
  if (!restURL) restURL = 'https://free-bch.fullstack.cash'

  const [serverUrl, setServerUrl] = useState(restURL)
  const [menuState, setMenuState] = useState(0)
  const [wallet, setWallet] = useState(false)
  const [servers, setServers] = useState([])

  // Startup state management
  const [asyncInitStarted, setAsyncInitStarted] = useState(false)
  const [asyncInitFinished, setAsyncInitFinished] = useState(false)
  const [asyncInitSucceeded, setAsyncInitSucceeded] = useState(null)

  // Modal state management
  const [showStartModal, setShowStartModal] = useState(true)
  const [modalBody, setModalBody] = useState([])
  const [hideSpinner, setHideSpinner] = useState(false)
  const [denyClose, setDenyClose] = useState(false)

  return {
    serverUrl,
    setServerUrl,
    menuState,
    setMenuState,
    wallet,
    setWallet,
    servers,
    setServers,
    asyncInitStarted,
    setAsyncInitStarted,
    asyncInitFinished,
    setAsyncInitFinished,
    asyncInitSucceeded,
    setAsyncInitSucceeded,
    showStartModal,
    setShowStartModal,
    modalBody,
    setModalBody,
    hideSpinner,
    setHideSpinner,
    denyClose,
    setDenyClose
  }
}

export default useAppState
