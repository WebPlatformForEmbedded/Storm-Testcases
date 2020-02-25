import {
  pluginDeactivate,
  getCpuLoad,
  pluginActivate,
  youtubeActions,
} from '../../commonMethods/commonFunctions'
import constants from '../../commonMethods/constants'

export default {
  title: 'Youtube Suspend/Resume robustness test',
  description:
    'Suspends and Resumes Youtube plugin repeatedly and checks if everything is started correctly',
  context: {
    cpuLoad: 90,
  },
  steps: [
    {
      description: 'Deactivate Youtube Plugin and Check if is stopped correctly',
      test: pluginDeactivate,
      params: constants.youTubePlugin,
      assert: 'deactivated',
    },
    {
      description: 'Deactivate WebKit Browser and Check if is stopped correctly',
      test: pluginDeactivate,
      params: constants.webKitBrowserPlugin,
      assert: 'deactivated',
    },
    {
      description: 'Deactivate Netflix and Check if is stopped correctly',
      test: pluginDeactivate,
      params: constants.netFlixPlugin,
      assert: 'deactivated',
    },
    {
      description: 'Activate Youtube Plugin and check if it is activated',
      test: pluginActivate,
      params: constants.youTubePlugin,
      assert: 'suspended',
    },
    {
      description: 'Resume Youtube Plugin and check if it is resumed',
      test: youtubeActions,
      params: constants.resume,
      assert: 'resumed',
    },
    {
      title: 'Repeat Steps for 30 times',
      description: 'Nested test to repeat the test for 30 times',
      repeat: 30,
      steps: [
        {
          description: 'Suspend Youtube Plugin and check if it is suspended',
          test: youtubeActions,
          params: constants.suspend,
          assert: 'suspended',
        },
        {
          description: 'Resume Youtube Plugin and check if it is resumed',
          test: youtubeActions,
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
