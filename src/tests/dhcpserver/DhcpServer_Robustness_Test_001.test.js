import constants from '../../commonMethods/constants'
import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import { getCpuLoad } from '../../commonMethods/deviceInfo'

export default {
  title: 'DHCP Server plugin robustness test',
  description:
    'Activates and Deactivates DHCP Server plugin repeatedly and checks the functionality',
  context: {
    cpuLoad: 90,
  },
  plugin: [constants.dhcpserver],
  steps: [
    {
      title: 'Activate and deactivate DHCP Server plugin for 30 times',
      description: 'Nested test to repeat the test for 30 times',
      repeat: 30,
      steps: [
        {
          description: 'Deactivate DHCP Server plugin and check if it is deactivated',
          test: pluginDeactivate,
          params: constants.dhcpserver,
          assert: 'deactivated',
        },
        {
          description: 'Activate DHCP Server Plugin and check if it is activated',
          test: pluginActivate,
          params: constants.dhcpserver,
          assert: 'activated',
        },
        {
          description: 'Get CPU load',
          test: getCpuLoad,
          params: constants.deviceInfo,
          validate() {
            let cpuload = this.$data.read('cpuload')
            this.$log('Cpu Load is', cpuload)
            if (cpuload > 90) {
              throw new Error('CPU load is greater than 90')
            } else {
              return true
            }
          },
        },
      ],
    },
  ],
}
