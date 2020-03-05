import {
  getAddressesInfo,
  pluginActivate,
  pluginDeactivate,
} from '../../commonMethods/commonFunctions'
import constants from '../../commonMethods/constants'

export default {
  title: 'Framework Device Info test to check valid IP',
  description: 'Check if there is a valid IP returned',
  steps: [
    {
      description: 'Deactivating DeviceInfo plugin',
      test: pluginDeactivate,
      params: constants.deviceInfo,
      assert: 'deactivated',
    },
    {
      description: 'Activating DeviceInfo plugin',
      test: pluginActivate,
      params: constants.deviceInfo,
      assert: 'activated',
    },
    {
      description: 'Get Device Info and check whether the result is object or not',
      sleep: 5,
      test() {
        return getAddressesInfo.call(this)
      },
      validate() {
        let result = this.$data.read('addressinfo')
        return this.$expect(result).to.be.object() === true
      },
    },
  ],
  validate() {
    let response = this.$data.read('addressinfo')
    if (response !== undefined && response.length !== 0) {
      for (let i = 0; i < response.length; i++) {
        let addresseinfo = response[i]
        if (addresseinfo.name === undefined || addresseinfo.mac === undefined) {
          this.$log('Error reading interface name or mac on interface idx: ' + i)
          return false
        }
        if (addresseinfo.ip !== undefined && !addresseinfo.ip.includes('127.0.0.1')) {
          return true
        }
        if (i == response.length - 1) {
          this.$log('No valid IP address found in Framework response')
          return false
        }
      }
    } else {
      this.$log('Error reading addresses object from DeviceInfo')
      return false
    }
  },
}
