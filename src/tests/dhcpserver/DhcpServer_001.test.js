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
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, constants.dhcpserver),
      () => pluginActivate.call(this, constants.dhcpserver),
    ])
  },
  teardown() {
    pluginDeactivate.call(this, constants.dhcpserver)
  },
  steps: [
    {
      description: 'Deactivate the dhcp interface and validate the result',
      test() {
        return dhcpInterfaceDeactivate.call(this, this.$context.read('interface'))
      },
      validate(res) {
        if (res == null) {
          return true
        } else {
          throw new Error('Error in deactivating DHCP interface')
        }
      },
    },
    {
      description: 'Get Interface Status and validate the result',
      test() {
        return getDhcpStatus.call(this, this.$context.read('interface'))
      },
      validate(res) {
        if (res.interface != null && res.active == 'false') {
          return true
        } else {
          throw new Error('Error in getting dhcp server status')
        }
      },
    },
    {
      description: 'Activate the dhcp interface and validate the result',
      test() {
        return dhcpInterfaceActivate.call(this, this.$context.read('interface'))
      },
      validate(res) {
        if (res == null) {
          return true
        } else {
          throw new Error('Error in activating DHCP interface')
        }
      },
    },
    {
      description: 'Get Interface Status and validate the result',
      test() {
        return getDhcpStatus.call(this, this.$context.read('interface'))
      },
      validate(res) {
        if (
          res.interface != null &&
          res.active == 'true' &&
          res.begin != null &&
          res.end != null &&
          res.router != null &&
          res.leases[0].name != null &&
          res.leases[0].ip != null &&
          res.leases[0].expires != null
        ) {
          return true
        } else {
          throw new Error('Error in getting dhcp server status')
        }
      },
    },
  ],
}
