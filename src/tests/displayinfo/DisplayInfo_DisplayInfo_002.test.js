import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'
import { getDisplayInfo } from '../../commonMethods/displayInfo'

export default {
  title: 'DisplayInfo - 002',
  description: 'Get Display Info when display is not connected and validate the result',
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, constants.displayInfo),
      () => pluginActivate.call(this, constants.displayInfo),
    ])
  },
  steps: [
    {
      description: 'Get Display Info when Display is disconnected and validate the result',
      test() {
        //TODO Prompt the user to disconnect display from the user and ask for confirmation
        return getDisplayInfo.call(this)
      },
      validate(res) {
        if (
          res.totalgpuram !== null &&
          res.freegpuram !== null &&
          res.audiopassthrough !== null &&
          res.connected === false &&
          res.width !== null &&
          res.height !== null &&
          res.hdcpprotection !== null &&
          res.hdrtype !== null
        ) {
          return true
        } else {
          throw new Error('Display is not disconnected')
        }
      },
    },
  ],
}
