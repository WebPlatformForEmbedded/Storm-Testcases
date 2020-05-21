import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import { setCobaltState, suspendOrResumeCobaltPlugin } from '../../commonMethods/cobalt'
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
      description: 'Activate Youtube Plugin and check suspended or not',
      test: pluginActivate,
      params: constants.youTubePlugin,
      assert: 'suspended',
    },
    {
      description: 'Resume Cobalt Plugin and check resumed or not',
      sleep: 10,
      test() {
        suspendOrResumeCobaltPlugin.call(this, constants.resume)
      },
    },
    {
      title: 'Repeat Steps for 30 times',
      description: 'Nested test to repeat the test for 30 times',
      repeat: 30,
      steps: [
        {
          description: 'Suspend Cobalt Plugin and check if it is suspended',
          test() {
            return setCobaltState.call(this, constants.suspend)
          },
          validate(res) {
            if (res == null) {
              return true
            } else {
              return false
            }
          },
        },
        {
          description: 'Resume Cobalt Plugin and check if it is resumed',
          test() {
            return setCobaltState.call(this, constants.resume)
          },
          validate(res) {
            if (res == null) {
              return true
            } else {
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
