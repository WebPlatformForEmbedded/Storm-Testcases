import constants from '../../commonMethods/constants'
import { getControllerPluginData, pluginDeactivate } from '../../commonMethods/controller'
import {
  checkIfProcessIsRunning,
  startFramework,
  stopWPEFramework,
} from '../../commonMethods/commonFunctions'
import { getCpuLoad } from '../../commonMethods/deviceInfo'

export default {
  title: 'Framework startup robustness test',
  description:
    'Starts and stops Framework repeatedly and checks if everything is started correctly',
  repeat: 100,
  context: {
    cpuLoad: 90,
  },
  steps: [
    {
      description: 'Check if Netflix Plugin is stopped correctly',
      test: pluginDeactivate,
      params: constants.netFlixPlugin,
      assert: 'deactivated',
    },
    {
      description: 'Check if Youtube Plugin is stopped correctly',
      test: pluginDeactivate,
      params: constants.youTubePlugin,
      assert: 'deactivated',
    },
    {
      description: 'Stop Framework',
      test: stopWPEFramework,
      params: constants.WPEFramework,
      assert: true,
    },
    {
      description: 'Check if WPE Framework is stopped correctly',
      test: checkIfProcessIsRunning,
      params: constants.WPEFramework,
      assert: false,
    },
    {
      description: 'Check if WPE Process is stopped correctly',
      test: checkIfProcessIsRunning,
      params: constants.WPEProcess,
      assert: false,
    },
    {
      description: 'Start Framework',
      test: startFramework,
      assert: true,
    },
    {
      description: 'Check if Framework responds',
      sleep: 5, //This sleep is to make sure that Provisioning plugin is activated
      test() {
        return getControllerPluginData.call(this)
      },
      validate(res) {
        this.$data.write('pluginInfo', res)
        return this.$expect(res).to.be.object() === true
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
      throw new Error('CPU load is greater than 90')
    } else {
      return true
    }
  },
}
