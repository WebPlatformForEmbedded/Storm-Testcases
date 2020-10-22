import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'
import { getPortName } from '../../commonMethods/displayInfo'

export default {
  title: 'DisplayInfo - Port Name - 001',
  description: 'Get PortName and validate the result',
  plugin: [constants.displayInfo],
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, constants.displayInfo),
      () => pluginActivate.call(this, constants.displayInfo),
    ])
  },
  steps: [
    {
      description: 'Get Port Name and validate the result',
      test() {
        return getPortName.call(this)
      },
      validate(res) {
        if (res !== null || res === '') {
          return true
        } else {
          throw new Error('Error in getting Port name')
        }
      },
    },
  ],
}
