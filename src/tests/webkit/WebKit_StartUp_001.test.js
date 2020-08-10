import constants from '../../commonMethods/constants'
import { pluginDeactivate } from '../../commonMethods/controller'
import { setSshHost, checkIfProcessIsRunning } from '../../commonMethods/ssh.js'
import { webKitBrowserStartAndResume } from '../../commonMethods/webKitBrowser'
import { getCpuLoad } from '../../commonMethods/deviceInfo'

export default {
  title: 'WPEWebkit startup robustness test',
  description:
    'Starts and stops the WPEWebkit plugin repeatedly and checks if everything is started correctly',
  repeat: 30,
  setup() {
    return this.$sequence([
      () => setSshHost(this.$thunder.api.options.host),
      () => pluginDeactivate.call(this, 'WebKitBrowser'), //make sure the browser is turned off
      () => pluginDeactivate.call(this, 'UX'), //make sure UX is turned off
      () => pluginDeactivate.call(this, 'Netflix'), //make sure Netflix is turned off
      () => pluginDeactivate.call(this, 'Cobalt'), //make sure Cobalt is turned off
    ])
  },
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
      throw new Error('CPU load is greater than 90')
    } else {
      return true
    }
  },
}
