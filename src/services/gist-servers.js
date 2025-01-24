/*
  This library downloads a dynamic list of back-end servers from a GitHub Gist.
*/

const axios = require('axios')

class GistServers {
  constructor () {
    this.axios = axios
  }

  // Retrieve a JSON file from a GitHub Gist
  async getServerList () {
    try {
      // https://gist.github.com/christroutner/e818ecdaed6c35075bfc0751bf222258
      // 'https://api.github.com/gists/63c5513782181f8b8ea3eb89f7cadeb6'

      const gistUrl = 'https://consumers.psfoundation.info/consumers.json'

      // Retrieve the gist from github.com.
      const result = await this.axios.get(gistUrl)
      // console.log('result.data: ', result.data)

      // Get the current content of the gist.
      const content = result.data.servers
      // console.log('content: ', content)

      return content
    } catch (err) {
      console.error('Error in getCRList()')
      throw err
    }
  }
}

export default GistServers
