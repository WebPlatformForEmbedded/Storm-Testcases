import { dhcpInterfaceDeactivate } from '../../commonMethods/dhcpServer'
import { pluginDeactivate, pluginActivate } from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'

export default {
  title: 'DHCP Server Interface Deactivate - 001',
  description: 'Checks deactivate functionality for invalid interface and validates the result',
  context: {
    interface: 'invalidString',
  },
  steps: [
    {
      description: 'Deactivate DHCP Plugin and check deactivated or not',
      test: pluginDeactivate,
      params: constants.dhcpserver,
      assert: 'deactivated',
    },
    {
      description: 'Activate DHCP Plugin and check activated or not',
      test: pluginActivate,
      params: constants.dhcpserver,
      assert: 'activated',
    },
    {
      description: 'Deactivate the invalid dhcp interface and validate the result',
      test() {
        return dhcpInterfaceDeactivate.call(this, this.$context.read('interface'))
      },
      validate(res) {
        if (res.code === 22 && res.message === 'ERROR_UNKNOWN_KEY') {
          return true
        } else {
          this.$log('Proper error message is not shown')
          return false
        }
      },
    },
  ],
}
