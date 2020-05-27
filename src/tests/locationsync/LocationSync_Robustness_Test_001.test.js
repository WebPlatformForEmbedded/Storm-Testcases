import constants from '../../commonMethods/constants'
import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import { getCpuLoad } from '../../commonMethods/deviceInfo'

export default {
  title: 'Location Sync Plugin robustness test',
  description:
    'Activates and Deactivates Location Sync plugin repeatedly and checks the functionality',
  context: {
    cpuLoad: 90,
  },
  steps: [
    {
      title: 'Activate and deactivate Location Sync plugin for 30 times',
      description: 'Nested test to repeat the test for 30 times',
      repeat: 30,
      steps: [
        {
          description: 'Deactivate Location Sync plugin and check if it is deactivated',
          test: pluginDeactivate,
          params: constants.locationSyncPlugin,
          assert: 'deactivated',
        },
        {
          description: 'Activate Location Sync Plugin and check if it is activated',
          test: pluginActivate,
          params: constants.locationSyncPlugin,
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
              this.$log('CPU load is greater than 90')
              return false
            } else {
              return true
            }
          },
        },
      ],
    },
  ],
}
