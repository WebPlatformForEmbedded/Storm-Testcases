import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import { checkIfProcessIsRunning } from '../../commonMethods/commonFunctions'
import { getCpuLoad } from '../../commonMethods/deviceInfo'
import constants from '../../commonMethods/constants'
import { suspendOrResumeCobaltPlugin, youtubeStartAndResume } from '../../commonMethods/cobalt'

export default {
  title: 'Youtube startup robustness test',
  description:
    'Starts and stops the Youtube plugin repeatedly and checks if everything is started correctly',
  repeat: 30,
  context: {
    cpuLoad: 90,
  },
  steps: [
    {
      description: 'Check if Youtube is stopped correctly',
      test: pluginDeactivate,
      params: constants.youTubePlugin,
      assert: 'deactivated',
    },
    {
      description: 'Check if Youtube Implementation rpcprocess is gone',
      test: checkIfProcessIsRunning,
      params: constants.youtubeImplementation,
      assert: false,
    },
    {
      description: 'Activate Youtube Plugin and check suspended or not',
      test: pluginActivate,
      params: constants.youTubePlugin,
      assert: 'suspended',
    },
    {
      description: 'Resume Cobalt Plugin and check resumed or not',
      test() {
        suspendOrResumeCobaltPlugin.call(this, constants.resume)
      },
    },
    {
      description: 'Get CPU load',
      test: getCpuLoad,
      params: constants.deviceInfo,
    },
  ],
  validate() {
    let cpuload = this.$data.read('cpuload')
    if (cpuload > 90) {
      this.$log('CPU load is greater than 90')
      return false
    } else {
      return true
    }
  },
}
