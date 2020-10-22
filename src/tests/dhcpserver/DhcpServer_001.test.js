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
  plugin: [constants.dhcpserver],
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, constants.dhcpserver),
      () => pluginActivate.call(this, constants.dhcpserver),
    ])
  },
  steps: [
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
      validate(result) {
        let res = result[0]
        if (res.interface == this.$context.read('interface') && res.active == true) {
          return true
        } else {
          throw new Error(
            'Error in getting dhcp server status after activating DHCP Server interface'
          )
        }
      },
    },
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
      validate(result) {
        let res = result[0]
        if (res.interface === this.$context.read('interface') && res.active == false) {
          return true
        } else {
          throw new Error('Error in getting dhcp server status after deactivating DHCP Interface')
        }
      },
    },
  ],
}
