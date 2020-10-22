import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'
import { getFreeGPURam } from '../../commonMethods/displayInfo'

export default {
  title: 'DisplayInfo - FreeGpuRam - 001',
  description: 'Get Free GPU Ram and validate the result',
  plugin: [constants.displayInfo],
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, constants.displayInfo),
      () => pluginActivate.call(this, constants.displayInfo),
    ])
  },
  steps: [
    {
      description: 'Get FreeGpuRam and validate the result',
      test() {
        return getFreeGPURam.call(this)
      },
      validate(res) {
        if (res !== null) {
          return true
        } else {
          throw new Error('Error in getting Free GPU ram Info')
        }
      },
    },
  ],
}
