import {
  pluginDeactivate,
  checkIfProcessIsRunning,
  getCpuLoad,
  webKitBrowserStartAndResume,
} from '../commonMethods/commonFunctions'
import constants from '../commonMethods/constants'

export default {
  title: 'WPEWebkit startup robustness test',
  description:
    'Starts and stops the WPEWebkit plugin repeatedly and checks if everything is started correctly',
  repeat: 30,
  context: {
    cpuLoad: 90,
  },
  steps: [
    {
      description: 'Check if WPEWebkit is stopped correctly',
      test: pluginDeactivate,
      params: constants.webKitBrowserPlugin,
      assert: 'deactivated',
    },
    {
      description: 'Check if WebKitImplementation rpcprocess is gone',
      test: checkIfProcessIsRunning,
      params: constants.webKitImplementation,
      assert: false,
    },
    {
      description: 'Activating WebKit Browser Plugin',
      test: webKitBrowserStartAndResume,
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
