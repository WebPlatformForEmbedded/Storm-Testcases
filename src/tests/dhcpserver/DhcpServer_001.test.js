import {
  dhcpInterfaceActivate,
  dhcpInterfaceDeactivate,
  getDhcpStatus,
} from '../../commonMethods/dhcpServer'
import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'

export default {
  title: 'DHCP Server - 001',
  description: 'Checks DHCP Server Activation/Deactivation/Status and validates the result',
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
      description: 'Activate DHCP Plugin and check deactivated or not',
      test: pluginActivate,
      params: constants.dhcpserver,
      assert: 'activated',
    },
    {
      description: 'Deactivate the dhcp interface and validate the result',
      test() {
        return dhcpInterfaceDeactivate.call(this, this.$context.read('interface'))
      },
      assert: null,
    },
    {
      description: 'Activate the dhcp interface and validate the result',
      test() {
        return dhcpInterfaceActivate.call(this, this.$context.read('interface'))
      },
      assert: null,
    },
    {
      description: 'Get Interface Status and validate the result',
      test() {
        return getDhcpStatus.call(this, this.$context.read('interface'))
      },
      validate(res) {
        if (
          res.interface != null &&
          res.active != null &&
          res.begin != null &&
          res.end != null &&
          res.router != null &&
          res.lease.name != null &&
          res.lease.ip != null &&
          res.lease.expires != null
        ) {
          return true
        } else {
          this.$log('Error in getting dhcp server status')
          return false
        }
      },
    },
  ],
}
