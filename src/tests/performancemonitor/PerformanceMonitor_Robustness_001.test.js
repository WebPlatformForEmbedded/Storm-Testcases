import constants from '../../commonMethods/constants'
import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import { getCpuLoad } from '../../commonMethods/deviceInfo'

export default {
  title: 'Performance Monitor Plugin plugin robustness test',
  description:
    'Activates and Deactivates Performance Monitor plugin repeatedly and checks the functionality',
  context: {
    cpuLoad: 90,
  },
  plugin: [constants.performanceMonitor],
  steps: [
    {
      title: 'Activate and deactivate Performance Monitor plugin for 30 times',
      description: 'Nested test to repeat the test for 30 times',
      repeat: 30,
      steps: [
        {
          description: 'Deactivate Performance Monitor plugin and check if it is deactivated',
          test: pluginDeactivate,
          params: constants.performanceMonitor,
          assert: 'deactivated',
        },
        {
          description: 'Activate Performance Monitor Plugin and check if it is activated',
          test: pluginActivate,
          params: constants.performanceMonitor,
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
              throw new Error(`CPU load is greater than 90 and is ${cpuload}`)
            } else {
              return true
            }
          },
        },
      ],
    },
  ],
}
