import constants from '../../commonMethods/constants'
import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import { getCpuLoad } from '../../commonMethods/deviceInfo'

export default {
  title: 'WebServer Plugin robustness test',
  description: 'Activates and Deactivates WebServer plugin repeatedly and checks the functionality',
  context: {
    cpuLoad: 90,
  },
  plugin: [constants.webServerPlugin],
  steps: [
    {
      title: 'Activate and deactivate WebServer plugin for 30 times',
      description: 'Nested test to repeat the test for 30 times',
      repeat: 30,
      steps: [
        {
          description: 'Deactivate WebServer plugin and check if it is deactivated',
          test: pluginDeactivate,
          params: constants.webServerPlugin,
          assert: 'deactivated',
        },
        {
          description: 'Activate WebServer Plugin and check if it is activated',
          test: pluginActivate,
          params: constants.webServerPlugin,
          assert: 'resumed',
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
