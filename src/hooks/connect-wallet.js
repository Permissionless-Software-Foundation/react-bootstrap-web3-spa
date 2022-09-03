/*
  ~ What it does? ~

  Create a wallet if it doesn't exist. Store the wallet in LocalStorage.
  Instantiated wallet data is passed to the AppStore.

  ~ How can I use? ~

  useConnectWallet()
*/

import { useEffect, useCallback } from 'react'
import { AppStore } from '../AppStore'
import useLocalStorage from './local-storage'
import BchWallet from '../utils/bch-wallet'

const DEFAULT_PRICE = 150.0

const useConnectWallet = () => {
  const [mnemonic, setMnemonic] = useLocalStorage(BchWallet.STORAGE_ID, null)
  const [server, setServer] = useLocalStorage(
    BchWallet.SERVER_ID,
    BchWallet.DEFAULT_SERVER
  )

  const connectWallet = useCallback(async () => {
    try {
      const backendServers = await BchWallet.getServers()
      const defaultServer = server || BchWallet.DEFAULT_SERVER
      const walletLib = await BchWallet.loadLib()
      const bchWallet = await BchWallet.initialize(
        walletLib,
        defaultServer,
        mnemonic,
        setMnemonic
      )
      const bchPrice = await bchWallet.getUsd()
      AppStore.update((s) => {
        s.defaultServers = backendServers || BchWallet.DEFAULT_SERVERS
        s.walletLib = walletLib || undefined
        s.wallet = bchWallet || undefined
        s.bchPrice = bchPrice > 0 ? bchPrice : DEFAULT_PRICE
        s.serverUrl = defaultServer
      })
      setServer(defaultServer)
    } catch (error) {
      console.error(error)
    }
  }, [mnemonic, setMnemonic, server, setServer])

  useEffect(() => {
    connectWallet()
  }, [connectWallet])
}

export default useConnectWallet
