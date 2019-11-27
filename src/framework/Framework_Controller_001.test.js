import { getControllerUI, getPluginInfo, restartFramework } from '../commonMethods/commonFunctions'
import constants from '../commonMethods/constants'

export default {
  title: 'Framework Controller test 01',
  description: 'Tests basic functionality of the controller module',
  teardown: restartFramework,
  steps: [
    {
      description: 'Check if response is a JSON response',
      test: getPluginInfo,
      params: constants.controllerPlugin,
      validate(result) {
        this.$data.write('pluginData', result.data)
        return this.$expect(result).to.be.object() === true
      },
    },
    {
      description: 'Check for mandatory elements in response',
      test() {
        let pluginInfo = this.$data.read('pluginData')
        if (pluginInfo.plugins !== undefined && pluginInfo.plugins.length > 0) {
          if (pluginInfo.server !== undefined && pluginInfo.channel !== undefined) {
            return true
          } else {
            this.$log('Server of Channel object not found')
            return false
          }
        } else {
          this.$log('Plugins not found')
          return false
        }
      },
      assert: true,
    },
    {
      description: 'Check for mandatory elements  in plugins list',
      test() {
        let pluginInfo = this.$data.read('pluginData')
        if (pluginInfo.plugins === undefined) return false
        for (let i = 0; i < pluginInfo.plugins.length; i++) {
          let plugin = pluginInfo.plugins[i]
          if (
            plugin.callsign === undefined ||
            plugin.locator === undefined ||
            plugin.state === undefined
          ) {
            this.$log('Failed plugin is ==>', plugin)
            return false
          }
          if (i === pluginInfo.plugins.length - 1) return true
        }
      },
      assert: true,
    },
    {
      description: 'Get Controller UI',
      test: getControllerUI,
      validate(result) {
        let status = result.status
        if (status === 200) return true
        else return false
      },
    },
  ],
}
