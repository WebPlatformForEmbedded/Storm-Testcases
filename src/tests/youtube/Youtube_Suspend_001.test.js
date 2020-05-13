import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import { youtubeChangeState } from '../../commonMethods/cobalt'
import { getCpuLoad } from '../../commonMethods/deviceInfo'
import constants from '../../commonMethods/constants'

export default {
  title: 'Youtube Suspend/Resume robustness test',
  description:
    'Suspends and Resumes Youtube plugin repeatedly and checks if everything is started correctly',
  context: {
    cpuLoad: 90,
  },
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, 'WebKitBrowser'), //make sure the browser is turned off
      () => pluginDeactivate.call(this, 'UX'), //make sure UX is turned off
      () => pluginDeactivate.call(this, 'Netflix'), //make sure Netflix is turned off
      () => pluginDeactivate.call(this, 'Cobalt'), //make sure Cobalt is turned off
    ])
  },
  steps: [
    {
      description: 'Activate Youtube Plugin and check if it is activated',
      test: pluginActivate,
      params: constants.youTubePlugin,
      assert: 'resumed',
    },
    {
      title: 'Repeat Steps for 30 times',
      description: 'Nested test to repeat the test for 30 times',
      repeat: 30,
      steps: [
        {
          description: 'Suspend Youtube Plugin and check if it is suspended',
          test: youtubeChangeState,
          params: constants.suspend,
          assert: 'suspended',
        },
        {
          description: 'Resume Youtube Plugin and check if it is resumed',
          test: youtubeChangeState,
          params: constants.resume,
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
