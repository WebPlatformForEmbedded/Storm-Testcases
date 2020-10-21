import { dhcpInterfaceActivate } from '../../commonMethods/dhcpServer'
import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'

export default {
  title: 'DHCP Server Interface Activate - 002',
  description: 'Checks the framework behavior when activating the already activated DHCP interface',
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, constants.dhcpserver),
      () => pluginActivate.call(this, constants.dhcpserver),
    ])
  },
  context: {
    interface: 'eth0',
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
          throw new Error('Error in Activating DHCP interface')
        }
      },
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
          throw new Error(
            `Proper error message is not shown when we activate already activated DHCP interface and Error: {code: ${res.code}, message:${res.message}}`
          )
        }
      },
    },
  ],
}
