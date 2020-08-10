import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import { getCpuLoad } from '../../commonMethods/deviceInfo'
import constants from '../../commonMethods/constants'
import { setSshHost, checkIfProcessIsRunning } from '../../commonMethods/ssh.js'

export default {
  title: 'Netflix startup robustness test',
  description:
    'Starts and stops the Netflix plugin repeatedly and checks if everything is started correctly',
  repeat: 30,
  setup() {
    setSshHost(this.$thunder.api.options.host)
  },
  steps: [
    {
      description: 'Stop WebKit Browser Plugin',
      test: pluginDeactivate,
      params: constants.webKitBrowserPlugin,
      assert: 'deactivated',
    },
    {
      description: 'Stop Youtube Plugin',
      test: pluginDeactivate,
      params: constants.youTubePlugin,
      assert: 'deactivated',
    },
    {
      description: 'Stop Netflix Plugin',
      test: pluginDeactivate,
      params: constants.netFlixPlugin,
      assert: 'deactivated',
    },
    {
      description: 'Check if NetflixImplementation rpcprocess is gone',
      test: checkIfProcessIsRunning,
      params: constants.netflixImplementation,
      assert: false,
    },
    {
      description: 'Start Netflix Plugin',
      test: pluginActivate,
      params: constants.netFlixPlugin,
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
