import { dhcpInterfaceActivate } from '../../commonMethods/dhcpServer'
import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'

export default {
  title: 'DHCP Server Interface Activate - 001',
  description: 'Checks activate functionality for invalid interface and validates the result',
  context: {
    interface: 'invalidInterface',
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
      description: 'Activate invalid dhcp interface and validate the result',
      test() {
        return dhcpInterfaceActivate.call(this, this.$context.read('interface'))
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
