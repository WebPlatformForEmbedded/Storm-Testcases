import { getControllerPluginData, getControllerUI } from '../../commonMethods/commonFunctions'
import constants from '../../commonMethods/constants'

export default {
  title: 'Framework Controller test 01',
  description: 'Tests basic functionality of the controller module',
  steps: [
    {
      description: 'Check if response is a JSON response',
      sleep: 5,
      test() {
        return getControllerPluginData.call(this)
      },
      validate(res) {
        this.$data.write('pluginInfo', res)
        return this.$expect(res).to.be.object() === true
      },
    },
    {
      description: 'Check for mandatory elements  in plugins list',
      test() {
        let pluginInfo = this.$data.read('pluginInfo')
        for (let i = 0; i < pluginInfo.length; i++) {
          let plugin = pluginInfo[i]
          //TODO (Controller Plugin doesnt have locator? )
          if (plugin.callsign != constants.controllerPlugin) {
            if (
              plugin.callsign === undefined ||
              plugin.locator === undefined ||
              plugin.state === undefined
            ) {
              return false
            }
          }
          if (i === pluginInfo.length - 1) return true
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
