import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'
import { getHorizontalResolution } from '../../commonMethods/displayInfo'

export default {
  title: 'DisplayInfo - Horizontal Resolution - 001',
  description: 'Get Horizontal Resolution and validate the result',
  plugin: [constants.displayInfo],
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, constants.displayInfo),
      () => pluginActivate.call(this, constants.displayInfo),
    ])
  },
  steps: [
    {
      description: 'Get Horizontal Resolution and validate the result',
      test() {
        return getHorizontalResolution.call(this)
      },
      validate(res) {
        if (res !== null) {
          return true
        } else {
          throw new Error('Error in getting Horizontal Resolution')
        }
      },
    },
  ],
}
