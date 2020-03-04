import {
  pluginDeactivate,
  checkIfProcessIsRunning,
  getCpuLoad,
  youtubeStartAndResume,
} from '../../commonMethods/commonFunctions'
import constants from '../../commonMethods/constants'

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
      description: 'Activating Youtube Plugin',
      test: youtubeStartAndResume,
      assert: 'resumed',
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
