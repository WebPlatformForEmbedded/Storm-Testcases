import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'
import { setHdcpProtection, getHdcpProtection } from '../../commonMethods/displayInfo'

export default {
  title: 'DisplayInfo - HDCP Protection - 002',
  description: 'Set HDCP Protection to HDCP1x and validate the result',
  plugin: [constants.displayInfo],
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, constants.displayInfo),
      () => pluginActivate.call(this, constants.displayInfo),
    ])
  },
  context: {
    hdcpProtection: 'HDCP1x',
  },
  steps: [
    {
      description: 'Set HDCP Protection to HDCP1x and validate the result',
      test() {
        return setHdcpProtection.call(this, this.$context.read('hdcpProtection'))
      },
      validate(res) {
        if (res === null) {
          return true
        } else {
          throw new Error(
            `Error in setting HDCP Protection to ${this.$context.read('hdcpProtection')}`
          )
        }
      },
    },
    {
      description: 'Get HDCP Protection and validate the result',
      test() {
        return getHdcpProtection.call(this)
      },
      validate(res) {
        if (res === this.$context.read('hdcpProtection')) {
          return true
        } else {
          throw new Error(`HDCP Protection not set to ${this.$context.read('hdcpProtection')}`)
        }
      },
    },
  ],
}
