import constants from '../../commonMethods/constants'
import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import { getDeviceInfo } from '../../commonMethods/deviceInfo'

export default {
  title: 'Framework Device Info test',
  description: 'Validates functionality of the Device Info plugin',
  plugin: [constants.deviceInfo],
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
        return getDeviceInfo.call(this)
      },
      validate() {
        let result = this.$data.read('systeminfo')
        return this.$expect(result).to.be.object() === true
      },
    },
  ],
  validate() {
    let systeminfo = this.$data.read('systeminfo')
    if (
      systeminfo === undefined ||
      systeminfo.version === undefined ||
      systeminfo.uptime === undefined ||
      systeminfo.totalram === undefined ||
      systeminfo.freeram === undefined ||
      systeminfo.devicename === undefined ||
      systeminfo.cpuload === undefined ||
      systeminfo.serialnumber === undefined ||
      systeminfo.time === undefined
    ) {
      throw new Error('Error reading systeminfo object from DeviceInfo')
    } else {
      return true
    }
  },
}
