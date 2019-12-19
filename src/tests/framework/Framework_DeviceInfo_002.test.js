import baseTest from './Framework_DeviceInfo_001.test'

export default {
  ...baseTest,
  ...{
    title: 'Framework Device Info test to check valid IP',
    description: 'Check if there is a valid IP returned',
    validate() {
      let resp = this.$data.read('pluginData')
      let response = resp.data
      if (response.addresses !== undefined && response.addresses.length !== 0) {
        for (let i = 0; i < response.addresses.length; i++) {
          let addresses = response.addresses[i]
          if (addresses.name === undefined || addresses.mac === undefined) {
            this.$log('Error reading interface name or mac on interface idx: ' + i)
            return false
          }
          if (addresses.ip !== undefined && !addresses.ip.includes('127.0.0.1')) {
            return true
          }
          if (i == response.addresses.length - 1) {
            this.$log('No valid IP address found in Framework response')
            return false
          }
        }
      } else {
        this.$log('Error reading addresses object from DeviceInfo')
        return false
      }
    },
  },
}
