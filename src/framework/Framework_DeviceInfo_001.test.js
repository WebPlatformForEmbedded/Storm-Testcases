import { getPluginInfo, pluginDeactivate, pluginActivate } from '../commonMethods/commonFunctions'
import constants from '../commonMethods/constants'
import { restartFramework1 } from '../../../../src/commonFunctions1'

export default {
  title: 'Framework Device Info test',
  description: 'Validates functionality of the Device Info plugin',
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
      description: 'Get DeviceInfo data',
      test: getPluginInfo,
      params: constants.deviceInfo,
      validate(result) {
        this.$data.write('pluginData', result)
        return this.$expect(result).to.be.object() === true
      },
    },
  ],
  validate() {
    let resp = this.$data.read('pluginData')
    let response = resp.data
    if (response.addresses !== undefined && response.addresses.length !== 0) {
      for (var i = 0; i < response.addresses.length; i++) {
        let addresses = response.addresses[i]
        if (addresses.name === undefined || addresses.mac === undefined) {
          this.$log('Error reading address name or mac on address idx: ' + i)
          return false
        }
      }
    } else {
      this.$log('Error reading addresses object from DeviceInfo')
      return false
    }
    if (
      response.systeminfo === undefined ||
      response.systeminfo.version === undefined ||
      response.systeminfo.uptime === undefined ||
      response.systeminfo.totalram === undefined ||
      response.systeminfo.freeram === undefined ||
      response.systeminfo.devicename === undefined ||
      response.systeminfo.cpuload === undefined ||
      response.systeminfo.totalgpuram === undefined ||
      response.systeminfo.freegpuram === undefined ||
      response.systeminfo.serialnumber === undefined ||
      response.systeminfo.deviceid === undefined ||
      response.systeminfo.time === undefined
    ) {
      this.$log('Error reading systeminfo object from DeviceInfo')
      return false
    } else {
      return true
    }
  },
}
