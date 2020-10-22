import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'
import { getStbCapabilities } from '../../commonMethods/displayInfo'

let stbCapabilities = ['HDROff', 'HDR10', 'HDR10Plus', 'HDRDolbyVision', 'HDRTechnicolor']

export default {
  title: 'DisplayInfo - STB Capabilities 001',
  description: 'Get STB Capabilities and validate the result',
  plugin: [constants.displayInfo],
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, constants.displayInfo),
      () => pluginActivate.call(this, constants.displayInfo),
    ])
  },
  steps: [
    {
      description: 'Get STB Capabilities and validate the result',
      test() {
        return getStbCapabilities.call(this)
      },
      validate(res) {
        if (res !== null) {
          if (stbCapabilities.includes(res[0])) {
            return true
          } else {
            throw new Error('stbCapabilities are not in the list of expected values')
          }
        } else {
          throw new Error('Error in getting stbCapabilities ')
        }
      },
    },
  ],
}
