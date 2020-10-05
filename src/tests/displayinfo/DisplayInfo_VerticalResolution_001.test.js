import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'
import { getVerticalResolution } from '../../commonMethods/displayInfo'

export default {
  title: 'DisplayInfo - Vertical Resolution - 001',
  description: 'Get Vertical Resolution and validate the result',
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, constants.displayInfo),
      () => pluginActivate.call(this, constants.displayInfo),
    ])
  },
  steps: [
    {
      description: 'Get Vertical Resolution and validate the result',
      test() {
        return getVerticalResolution.call(this)
      },
      validate(res) {
        if (res !== null) {
          return true
        } else {
          throw new Error('Error in getting Vertical Resolution')
        }
      },
    },
  ],
}
