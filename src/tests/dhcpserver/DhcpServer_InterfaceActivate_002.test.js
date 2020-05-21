import { dhcpInterfaceActivate } from '../../commonMethods/dhcpServer'
import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'

export default {
  title: 'DHCP Server Interface Activate - 002',
  description: 'Checks the framework behavior when activating the already activated DHCP interface',
  context: {
    interface: 'eth0',
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
      description: 'Activate the dhcp interface and validate the result',
      test() {
        return dhcpInterfaceActivate.call(this, this.$context.read('interface'))
      },
      assert: null,
    },
    {
      description: 'Activate the dhcp interface which is already activated and validate the result',
      test() {
        return dhcpInterfaceActivate.call(this, this.$context.read('interface'))
      },
      validate(res) {
        if (res.code === 5 && res.message === 'ERROR_ILLEGAL_STATE') {
          return true
        } else {
          this.$log('Proper error message is not shown')
          return false
        }
      },
    },
  ],
}
