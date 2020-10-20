import { dhcpInterfaceDeactivate } from '../../commonMethods/dhcpServer'
import { pluginDeactivate, pluginActivate } from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'

export default {
  title: 'DHCP Server Interface Deactivate - 001',
  description: 'Checks deactivate functionality for invalid interface and validates the result',
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, constants.dhcpserver),
      () => pluginActivate.call(this, constants.dhcpserver),
    ])
  },
  plugin: [constants.dhcpserver],
  context: {
    interface: 'invalidString',
  },
  steps: [
    {
      description: 'Deactivate the invalid dhcp interface and validate the result',
      test() {
        return dhcpInterfaceDeactivate.call(this, this.$context.read('interface'))
      },
      validate(res) {
        if (res.code === 22 && res.message === 'ERROR_UNKNOWN_KEY') {
          return true
        } else {
          throw new Error(
            'Proper error message is not shown when we deactivate the invalid DHCP interface'
          )
        }
      },
    },
  ],
}
