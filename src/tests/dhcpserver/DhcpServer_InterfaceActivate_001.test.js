import { dhcpInterfaceActivate } from '../../commonMethods/dhcpServer'
import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'

export default {
  title: 'DHCP Server Interface Activate - 001',
  description: 'Checks activate functionality for invalid interface and validates the result',
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, constants.dhcpserver),
      () => pluginActivate.call(this, constants.dhcpserver),
    ])
  },
  context: {
    interface: 'invalidInterface',
  },
  steps: [
    {
      description: 'Activate invalid dhcp interface and validate the result',
      test() {
        return dhcpInterfaceActivate.call(this, this.$context.read('interface'))
      },
      validate(res) {
        if (res.code === 22 && res.message === 'ERROR_UNKNOWN_KEY') {
          return true
        } else {
          throw new Error(
            `Proper error message is not shown when we activate invalid DHCP interface and Error: {code: ${res.code}, message:${res.message}}`
          )
        }
      },
    },
  ],
}
