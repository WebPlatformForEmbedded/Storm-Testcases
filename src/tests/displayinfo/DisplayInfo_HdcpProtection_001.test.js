import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'
import { getHdcpProtection } from '../../commonMethods/displayInfo'

let hdcpProtectionArr = ['Unencrypted', 'HDCP1x', 'HDCP2x']

export default {
  title: 'DisplayInfo - HDCP Protection - 001',
  description: 'Get HDCP Protection and validate the result',
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, constants.displayInfo),
      () => pluginActivate.call(this, constants.displayInfo),
    ])
  },
  steps: [
    {
      description: 'Get HDCP Protection and validate the result',
      test() {
        return getHdcpProtection.call(this)
      },
      validate(res) {
        if (res.hdcpprotection !== null) {
          if (hdcpProtectionArr.includes(res.hdcpprotection)) {
            return true
          } else {
            throw new Error('HDCP Protection is not in the list of expected values')
          }
        } else {
          throw new Error('Error in HDCP Protection')
        }
      },
    },
  ],
}
