import { dhcpInterfaceDeactivate } from '../../commonMethods/dhcpServer'
import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'

export default {
  title: 'DHCP Server Interface Deactivate - 002',
  description:
    'Checks the framework behavior when deactivating the already deactivated DHCP interface',
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
      description: 'Deactivate the dhcp interface and validate the result',
      test() {
        return dhcpInterfaceDeactivate.call(this, this.$context.read('interface'))
      },
      assert: null,
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
          this.$log('Proper error message is not shown')
          return false
        }
      },
    },
  ],
}
