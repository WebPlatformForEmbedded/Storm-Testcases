import {
  pluginDeactivate,
  pluginActivate,
  killClient,
  getControllerPluginData,
} from '../../commonMethods/commonFunctions'
import constants from '../../commonMethods/constants'

export default {
  title: 'Compositor Kill - 001',
  description: 'Kills the Plugin and validates the result',
  steps: [
    {
      description: 'Deactivate Netflix Plugin and check deactivated or not',
      test: pluginDeactivate,
      params: constants.netFlixPlugin,
      assert: 'deactivated',
    },
    {
      description: 'Activate Netflix Plugin and check resumed or not',
      test: pluginActivate,
      params: constants.netFlixPlugin,
      assert: 'resumed',
    },
    {
      description: 'Kill Netflix Plugin',
      test() {
        return killClient.call(this, constants.netFlixPlugin)
      },
      validate(res) {
        if (res == null) {
          return true
        } else {
          this.$log('Plugin not killed')
          return false
        }
      },
    },
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
      description: 'Check for Netflix plugin in plugins list',
      test() {
        let pluginInfo = this.$data.read('pluginInfo')
        //TODO Best way to check Netflix is still live need to be implemented
        if (pluginInfo.indexOf('Netflix') !== -1) {
          this.$log('CNetflix found in the list')
          return false
        } else {
          return true
        }
      },
      assert: true,
    },
  ],
}
