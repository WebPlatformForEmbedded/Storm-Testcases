import constants from '../../commonMethods/constants'
import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import { getCpuLoad } from '../../commonMethods/deviceInfo'

export default {
  title: 'IOConnector Plugin robustness test',
  description:
    'Activates and Deactivates IOConnector plugin repeatedly and checks the functionality',
  context: {
    cpuLoad: 90,
  },
  steps: [
    {
      title: 'Activate and deactivate IOconnector plugin for 30 times',
      description: 'Nested test to repeat the test for 30 times',
      repeat: 30,
      steps: [
        {
          description: 'Deactivate IO Connector plugin and check if it is deactivated',
          test: pluginDeactivate,
          params: constants.ioconnector,
          assert: 'deactivated',
        },
        {
          description: 'Activate IOConnector Plugin and check if it is activated',
          test: pluginActivate,
          params: constants.ioconnector,
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
