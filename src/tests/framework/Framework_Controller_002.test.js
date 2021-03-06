import {
  getControllerPluginData,
  pluginActivate,
  pluginDeactivate,
} from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'

export default {
  title: 'Framework Controller test 02',
  description: 'Tests basic functionality of the controller module',
  plugin: [constants.controllerPlugin],
  steps: [
    {
      description: 'Get /Service/Controller and validate whether it is Object or not',
      test: getControllerPluginData,
      validate(result) {
        this.$data.write('pluginInfo', result)
        return this.$expect(result).to.be.object() === true
      },
    },
    {
      description: 'Select a plugin from plugin list',
      test() {
        let pluginsToTry = ['DeviceInfo', 'Monitor', 'Tracing']
        let pluginInfo = this.$data.read('pluginInfo')
        for (var i = 0; i < pluginInfo.length; i++) {
          if (pluginsToTry.indexOf(pluginInfo[i].callsign) != -1) {
            this.$data.write('pluginName', pluginInfo[i].callsign)
            return true
          }
        }
      },
      assert: true,
    },
    {
      description: 'Deactivating Plugin',
      test() {
        return pluginDeactivate.call(this, this.$data.read('pluginName'))
      },
      assert: 'deactivated',
    },
    {
      description: 'Activating Plugin',
      test() {
        return pluginActivate.call(this, this.$data.read('pluginName'))
      },
      assert: 'activated',
    },
  ],
}
