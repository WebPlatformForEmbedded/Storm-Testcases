import {
  pluginActivate,
  pluginDeactivate,
  getControllerPluginData,
} from '../commonMethods/commonFunctions'

export default {
  title: 'Framework Controller Robustness test',
  description: 'Tests start/stop functionality of the controller module and repeats 100 times',
  steps: [
    {
      description: 'Get Controller data and validate whether it is Object or not',
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
      description: 'Nested step to repeat Deactivate and Activate Plugin for 100 times',
      repeat: 100,
      steps: [
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
    },
    {
      description: 'Check if Framework controller still responds',
      test: getControllerPluginData,
      validate(result) {
        return this.$expect(result).to.be.object() === true
      },
    },
  ],
}
