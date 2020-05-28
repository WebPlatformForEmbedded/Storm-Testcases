import { getDhcpStatus } from '../../commonMethods/dhcpServer'
import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'

export default {
  title: 'DHCP Server Interface Status - 001',
  description: 'Get Status for invalid Interface and validate the result',
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
      description: 'Gets Invalid Interface Status and validate the result',
      test() {
        return getDhcpStatus.call(this, this.$context.read('interface'))
      },
      validate(res) {
        if (res.code === 22 && res.message === 'ERROR_UNKNOWN_KEY') {
          return true
        } else {
          throw new Error(
            'Proper error message is not shown when we try to get the dhcp status of invalid DHCP interface'
          )
        }
      },
    },
  ],
}
