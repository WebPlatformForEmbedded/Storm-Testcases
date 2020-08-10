import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import { setSshHost, checkIfProcessIsRunning } from '../../commonMethods/ssh.js'
import { getCpuLoad } from '../../commonMethods/deviceInfo'
import constants from '../../commonMethods/constants'

export default {
  title: 'WebServer startup robustness test',
  description:
    'Starts and stops the webserver plugin repeatedly and checks if everything is started correctly',
  repeat: 30,
  setup() {
    return this.$sequence([
      () => setSshHost(this.$thunder.api.options.host),
      () => pluginDeactivate.call(this, constants.webServerPlugin),
      () => pluginActivate.call(this, constants.webServerPlugin),
    ])
  },
  context: {
    cpuLoad: 90,
  },
  steps: [
    {
      description: 'Deactivate WebServer plugin and check whether deactivated or not',
      test: pluginDeactivate,
      params: constants.webServerPlugin,
      assert: 'deactivated',
    },
    {
      description: 'Check if WebServer Implementation rpcprocess is gone',
      test: checkIfProcessIsRunning,
      params: constants.webServerImplementation,
      assert: false,
    },
    {
      description: 'Activating Web Server Plugin',
      test: pluginActivate,
      params: constants.webServerPlugin,
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
