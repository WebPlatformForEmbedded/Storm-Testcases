import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'
import { getDisplayInfo } from '../../commonMethods/displayInfo'

let hdcpProtectionArr = ['Unencrypted', 'HDCP1x', 'HDCP2x']
let hdrTypeArr = ['HDROff', 'HDR10', 'HDR10Plus', 'HDRDolbyVision', 'HDRTechnicolor']

export default {
  title: 'DisplayInfo - 001',
  description: 'Get Display Info and validate the result',
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, constants.displayInfo),
      () => pluginActivate.call(this, constants.displayInfo),
    ])
  },
  steps: [
    {
      description: 'Get Display Info and validate the result',
      test() {
        return getDisplayInfo.call(this)
      },
      validate(res) {
        if (
          res.totalgpuram !== null &&
          res.freegpuram !== null &&
          res.audiopassthrough !== null &&
          res.connected !== null &&
          res.width !== null &&
          res.height !== null &&
          res.hdcpprotection !== null &&
          res.hdrtype !== null
        ) {
          if (hdcpProtectionArr.includes(res.hdcpprotection) && hdrTypeArr.includes(res.hdrtype)) {
            return true
          } else {
            throw new Error('HDCP Protection and HDR type are not in the list of expected values')
          }
        } else {
          throw new Error('Error in getting display Info')
        }
      },
    },
  ],
}
