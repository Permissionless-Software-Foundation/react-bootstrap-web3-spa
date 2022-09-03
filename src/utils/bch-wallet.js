/*
  This is a library of utility functions that are specific to the PSF
  infrastructure and minimal-slp-wallet.
*/

import axios from 'axios'
import Jdenticon from '@chris.troutner/react-jdenticon'

const DEFAULT_SERVERS = [
  {
    value: 'https://free-bch.fullstack.cash',
    label: 'https://free-bch.fullstack.cash'
  },
  {
    value: 'https://bc01-ca-bch-consumer.fullstackcash.nl',
    label: 'https://bc01-ca-bch-consumer.fullstackcash.nl'
  },
  {
    value: 'https://pdx01-usa-bch-consumer.fullstackcash.nl',
    label: 'https://pdx01-usa-bch-consumer.fullstackcash.nl'
  },
  {
    value: 'https://wa-usa-bch-consumer.fullstackcash.nl',
    label: 'https://wa-usa-bch-consumer.fullstackcash.nl'
  }
]

const DEFAULT_SERVER = DEFAULT_SERVERS[2].value

const SERVERS_GIST_URL =
  'https://api.github.com/gists/63c5513782181f8b8ea3eb89f7cadeb6'

const STORAGE_ID = 'spa-wallet-seed'
const SERVER_ID = 'spa-wallet-server'

function sleep (ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// Retrieve a JSON file from a GitHub Gist
const getGistServersList = async (url = SERVERS_GIST_URL) => {
  try {
    const result = await axios.get(url)
    // console.log('result.data: ', result.data);
    const content = result.data.files['psf-consumer-apis.json'].content
    // console.log('content: ', content);
    const object = JSON.parse(content)
    // console.log('object: ', object)

    return object.consumerApis
  } catch (err) {
    console.error('Error in getServersList()')
    throw err
  }
}

// Given an IPFS URI, this will download and parse the JSON data.
// ipfsUri = ipfs://qm.....
const getIpfsData = async (ipfsUri) => {
  const cid = ipfsUri.slice(7)
  const downloadUrl = `https://${cid}.ipfs.dweb.link/data.json`
  const response = await axios.get(downloadUrl)
  if (response && response.data) return response.data
  return null
}

// Load the minimal-slp-wallet which comes in as a <script> file and is
// attached to the global 'window' object.
const loadLib = async () => {
  let bchWallet = false
  do {
    if (typeof window !== 'undefined' && window.SlpWallet) {
      bchWallet = window.SlpWallet
      return bchWallet
    } else {
      console.log('Waiting for wallet library to load...')
    }
    await sleep(1000)
  } while (!bchWallet)
}

const initialize = async (Library, url, mnemonic, onChange) => {
  let wallet
  const options = {
    interface: 'consumer-api',
    restURL: url,
    noUpdate: true
  }

  if (mnemonic) {
    // Load the wallet from the mnemonic, if it's available from local storage.
    wallet = new Library(mnemonic, options)
  } else {
    // Generate a new mnemonic and wallet.
    wallet = new Library(null, options)
  }

  // Wait for wallet to initialize.
  await wallet.walletInfoPromise
  await wallet.initialize()

  // Save the mnemonic to local storage.
  if (!mnemonic) {
    const newMnemonic = wallet.walletInfo.mnemonic
    if (typeof onChange === 'function') {
      onChange(newMnemonic)
    }
  }

  return wallet
}

// Get a list of alternative back end servers.
const getServers = async (url = SERVERS_GIST_URL) => {
  // Try to get the list from GitHub
  try {
    const gistServers = await getGistServersList(url)
    const serversAry = []

    for (let i = 0; i < gistServers.length; i++) {
      serversAry.push({ value: gistServers[i].url, label: gistServers[i].url })
    }

    return serversAry
  } catch (err) {
    console.error(
      'Error trying to retrieve list of servers from GitHub: ',
      err
    )
    console.log('Returning hard-coded list of servers.')
    return DEFAULT_SERVERS
  }
}

// Get a list of SLP tokens held by the wallet.
const getSlpTokenBalances = async (wallet) => {
  if (!wallet) return undefined
  // Get token information from the wallet.
  const slpTokens = await wallet.listTokens(wallet.walletInfo.cashAddress)

  // Add an icon property to each token.
  slpTokens.map((x) => {
    x.icon = <Jdenticon size='100' value={x.tokenId} />
    x.iconNeedsDownload = true
    return true
  })
  return slpTokens
}

// Get token data for a given Token ID
const getTokenData = async (wallet, tokenId) => {
  if (!wallet || !tokenId) return undefined
  const tokenData = await wallet.getTokenData(tokenId)
  tokenData.immutableData = {}
  tokenData.mutableData = {}
  // Convert the IPFS CIDs into actual data.
  // tokenData.immutableData = await getIpfsData(tokenData.immutableData);
  // tokenData.mutableData = await getIpfsData(tokenData.mutableData);
  return tokenData
}

// Get data about a Group token
const getGroupData = async (wallet, tokenId) => {
  if (!wallet || !tokenId) return undefined
  const tokenData = await getTokenData(wallet, tokenId)
  const groupData = {
    immutableData: tokenData.immutableData,
    mutableData: tokenData.mutableData,
    nfts: tokenData.genesisData.nfts,
    tokenId: tokenData.genesisData.tokenId
  }
  return groupData
}

const BchWallet = {
  loadLib,
  initialize,
  getServers,
  getIpfsData,
  getTokenData,
  getGroupData,
  getSlpTokenBalances,
  DEFAULT_SERVERS,
  DEFAULT_SERVER,
  STORAGE_ID,
  SERVER_ID
}

export default BchWallet
