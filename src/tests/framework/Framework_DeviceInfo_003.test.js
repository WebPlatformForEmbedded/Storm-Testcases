import { getSocketInfo } from '../../commonMethods/deviceInfo'
import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'

export default {
  title: 'Framework Device Info test to check Socket Info',
  description: 'Check if there is a valid socket info returned',
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
        return getSocketInfo.call(this)
      },
      validate() {
        let result = this.$data.read('socketinfo')
        return this.$expect(result).to.be.object() === true
      },
    },
  ],
  validate() {
    let response = this.$data.read('socketinfo')
    if (response.runs !== undefined && response.length !== 0) {
      return true
    } else {
      throw new Error('Error reading socket info DeviceInfo')
    }
  },
}
