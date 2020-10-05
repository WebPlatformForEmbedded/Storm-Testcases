import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'
import { getTvCapabilities } from '../../commonMethods/displayInfo'

let TvCapabilities = ['HDROff', 'HDR10', 'HDR10Plus', 'HDRDolbyVision', 'HDRTechnicolor']

export default {
  title: 'DisplayInfo - TV Capabilities 001',
  description: 'Get TV Capabilities and validate the result',
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, constants.displayInfo),
      () => pluginActivate.call(this, constants.displayInfo),
    ])
  },
  steps: [
    {
      description: 'Get TV Capabilities and validate the result',
      test() {
        return getTvCapabilities.call(this)
      },
      validate(res) {
        if (res !== null) {
          if (TvCapabilities.includes(res)) {
            return true
          } else {
            throw new Error('TvCapabilities are not in the list of expected values')
          }
        } else {
          throw new Error('Error in getting TvCapabilities ')
        }
      },
    },
  ],
}
