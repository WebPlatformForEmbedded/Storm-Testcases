import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'
import { getDisplayInfo } from '../../commonMethods/displayInfo'

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
          return true
        } else {
          throw new Error('Error in getting display Info')
        }
      },
    },
  ],
}
