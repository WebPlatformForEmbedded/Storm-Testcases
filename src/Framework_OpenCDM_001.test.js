import {
  pluginDeactivate,
  checkIfProcessIsRunning,
  pluginActivate,
  getCpuLoad,
  restartFramework,
} from './commonMethods/commonFunctions'
import constants from './commonMethods/constants'

export default {
  title: 'OCDM startup robustness test',
  description:
    'Starts and stops the OCDM plugin repeatedly and checks if everything is started correctly',
  repeat: 30,
  teardown: restartFramework,
  context: {
    cpuLoad: 90,
  },
  steps: [
    {
      description: 'Deactivate OCDM plugin and also check deactivated or not',
      test: pluginDeactivate,
      params: constants.ocdmPlugin,
      assert: 'deactivated',
    },
    {
      description: 'Check if OCDM Implementation rpcprocess is gone',
      test: checkIfProcessIsRunning,
      params: constants.ocdmImplementation,
      assert: false,
    },
    {
      description: 'Activating ocdmPlugin',
      test: pluginActivate,
      params: constants.ocdmPlugin,
      assert: 'activated',
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
