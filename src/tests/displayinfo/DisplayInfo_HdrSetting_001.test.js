import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'
import { getHdrSetting, getStbCapabilities } from '../../commonMethods/displayInfo'

let hdrSettings = ['HdrOff', 'Hdr10', 'Hdr10Plus', 'HdrHlg', 'HdrDolbyvision', 'HdrTechnicolor']

export default {
  title: 'DisplayInfo - HDR Settings 001',
  description: 'Get HDR Settings and validate the result',
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, constants.displayInfo),
      () => pluginActivate.call(this, constants.displayInfo),
    ])
  },
  steps: [
    {
      description: 'Get HDR Settings and validate the result',
      test() {
        return getHdrSetting.call(this)
      },
      validate(res) {
        if (res !== null) {
          if (hdrSettings.includes(res)) {
            return true
          } else {
            throw new Error('HDR Settings are not in the list of expected values')
          }
        } else {
          throw new Error('Error in getting HDR Settings ')
        }
      },
    },
  ],
}
