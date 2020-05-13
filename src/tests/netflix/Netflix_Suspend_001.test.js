import { getCpuLoad } from '../../commonMethods/deviceInfo'
import { pluginDeactivate, pluginActivate } from '../../commonMethods/controller'
import { suspendOrResumeNetflixPlugin } from '../../commonMethods/netflix'
import constants from '../../commonMethods/constants'

export default {
  title: 'Netflix Suspend/Resume robustness test',
  description:
    'Suspends and Resumes Netflix plugin repeatedly and checks if everything is started correctly',
  context: {
    cpuLoad: 90,
  },
  steps: [
    {
      description: 'Deactivate Webkit Browser Plugin and Check if is stopped correctly',
      test: pluginDeactivate,
      params: constants.webKitBrowserPlugin,
      assert: 'deactivated',
    },
    {
      description: 'Deactivate Youtube and Check if is stopped correctly',
      test: pluginDeactivate,
      params: constants.youTubePlugin,
      assert: 'deactivated',
    },
    {
      description: 'Deactivate Netflix and Check if is stopped correctly',
      test: pluginDeactivate,
      params: constants.netFlixPlugin,
      assert: 'deactivated',
    },
    {
      description: 'Activate Netflix Plugin and check if it is activated',
      test: pluginActivate,
      params: constants.netFlixPlugin,
      assert: 'resumed',
    },
    {
      title: 'Check CPU Load after suspending and resuming Netflix Plugin',
      description: 'Repeat for 30 times',
      repeat: 30,
      steps: [
        {
          description: 'Suspend Netflix Plugin',
          test() {
            return suspendOrResumeNetflixPlugin.call(this, 'suspended')
          },
          validate(res) {
            if (res.result == null) {
              return true
            } else {
              this.$log('Plugin not suspended')
              return false
            }
          },
        },
        {
          description: 'Resume Netflix Plugin',
          test() {
            return suspendOrResumeNetflixPlugin.call(this, 'resumed')
          },
          validate(res) {
            if (res.result == null) {
              return true
            } else {
              this.$log('Plugin not resumed')
              return false
            }
          },
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
