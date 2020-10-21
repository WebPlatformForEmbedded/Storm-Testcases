import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'
import { getCurrentHDMIStatus } from '../../commonMethods/displayInfo'

let connectionStatus = [true, false]

export default {
  title: 'DisplayInfo - Connected - 001',
  description: 'Get HDMI Connection Status and validate the result',
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, constants.displayInfo),
      () => pluginActivate.call(this, constants.displayInfo),
    ])
  },
  steps: [
    {
      description: 'Get HDMI Connection status and validate the result',
      test() {
        return getCurrentHDMIStatus.call(this)
      },
      validate(res) {
        if (connectionStatus.includes(res)) {
          return true
        } else {
          throw new Error('Error in getting connections status')
        }
      },
    },
  ],
}
