import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'
import { getWidthInCentimeters } from '../../commonMethods/displayInfo'

export default {
  title: 'DisplayInfo - Width In Centimeters - 001',
  description: 'Get Width In Centimeters and validate the result',
  plugin: [constants.displayInfo],
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, constants.displayInfo),
      () => pluginActivate.call(this, constants.displayInfo),
    ])
  },
  steps: [
    {
      description: 'Get Width in Centimeters and validate the result',
      test() {
        return getWidthInCentimeters.call(this)
      },
      validate(res) {
        if (res !== null && res !== undefined && !isNaN(res)) {
          return true
        } else {
          throw new Error('Error in getting Width')
        }
      },
    },
  ],
}
