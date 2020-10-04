import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import { setSshHost, checkIfProcessIsRunning } from '../../commonMethods/ssh.js'
import { getCpuLoad } from '../../commonMethods/deviceInfo'
import constants from '../../commonMethods/constants'
import { suspendOrResumeCobaltPlugin } from '../../commonMethods/cobalt'

export default {
  title: 'Youtube startup robustness test',
  description:
    'Starts and stops the Youtube plugin repeatedly and checks if everything is started correctly',
  repeat: 30,
  setup() {
    setSshHost(this.$thunder.api.options.host)
  },
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
        return suspendOrResumeCobaltPlugin.call(this, constants.resume)
      },
      validate(res) {
        if (res === null) {
          return true
        } else {
          throw new Error('Youtube not resumed')
        }
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
      throw new Error(`CPU load is greater than 90 and is ${cpuload}`)
    } else {
      return true
    }
  },
}
