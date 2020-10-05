import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'
import { getTotalGPURam } from '../../commonMethods/displayInfo'

export default {
  title: 'DisplayInfo - TotalGpuRam - 001',
  description: 'Get TotalGpuRam and validate the result',
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, constants.displayInfo),
      () => pluginActivate.call(this, constants.displayInfo),
    ])
  },
  steps: [
    {
      description: 'Get TotalGpuRam and validate the result',
      test() {
        return getTotalGPURam.call(this)
      },
      validate(res) {
        if (res !== null) {
          return true
        } else {
          throw new Error('Error in getting Total GPU ram Info')
        }
      },
    },
  ],
}
