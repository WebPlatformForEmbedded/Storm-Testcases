import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'
import { getVerticalFrequency } from '../../commonMethods/displayInfo'

export default {
  title: 'DisplayInfo - Vertical Frequency - 001',
  description: 'Get Vertical Frequency and validate the result',
  plugin: [constants.displayInfo],
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, constants.displayInfo),
      () => pluginActivate.call(this, constants.displayInfo),
    ])
  },
  steps: [
    {
      description: 'Get Vertical Frequency and validate the result',
      test() {
        return getVerticalFrequency.call(this)
      },
      validate(res) {
        if (res !== null) {
          return true
        } else {
          throw new Error('Error in getting Vertical Frequency')
        }
      },
    },
  ],
}
