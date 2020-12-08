import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'
import { getHeightInCentimeters } from '../../commonMethods/displayInfo'

export default {
  title: 'DisplayInfo - Height In Centimeters - 001',
  description: 'Get Height In Centimeters and validate the result',
  plugin: [constants.displayInfo],
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, constants.displayInfo),
      () => pluginActivate.call(this, constants.displayInfo),
    ])
  },
  steps: [
    {
      description: 'Get Height in Centimeters and validate the result',
      test() {
        return getHeightInCentimeters.call(this)
      },
      validate(res) {
        if (res !== null && res !== undefined && !isNaN(res)) {
          return true
        } else {
          throw new Error('Error in getting Height')
        }
      },
    },
  ],
}
