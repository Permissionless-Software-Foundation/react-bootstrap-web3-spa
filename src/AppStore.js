import { Store } from 'pullstate'

export const AppStore = new Store({
  defaultServers: [],
  serverUrl: undefined,
  walletLib: undefined,
  wallet: undefined,
  bchBalance: undefined,
  token: undefined,
  slpTokens: undefined,
  bchPrice: 150
})
