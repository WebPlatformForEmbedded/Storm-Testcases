import { dhcpInterfaceDeactivate } from '../../commonMethods/dhcpServer'
import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'

export default {
  title: 'DHCP Server Interface Deactivate - 002',
  description:
    'Checks the framework behavior when deactivating the already deactivated DHCP interface',
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, constants.dhcpserver),
      () => pluginActivate.call(this, constants.dhcpserver),
    ])
  },
  teardown() {
    pluginDeactivate.call(this, constants.dhcpserver)
  },
  context: {
    interface: 'eth0',
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
          throw new Error('Error in Deactivating DHCP interface')
        }
      },
    },
    {
      description:
        'Deactivate the dhcp interface which is already deactivated and validate the result',
      test() {
        return dhcpInterfaceDeactivate.call(this, this.$context.read('interface'))
      },
      validate(res) {
        if (res.code === 5 && res.message === 'ERROR_ILLEGAL_STATE') {
          return true
        } else {
          throw new Error(
            'Proper error message is not shown when we deactivate the already deactivate DHCP interface'
          )
        }
      },
    },
  ],
}
