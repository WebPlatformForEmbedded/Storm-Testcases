import {
  pluginDeactivate,
  pluginActivate,
  startProvisioning,
  getNetflixPluginEsnInfo,
} from '../../commonMethods/commonFunctions'
import constants from '../../commonMethods/constants'

export default {
  title: 'Netflix provisioning tests',
  description:
    'Validate if Framework does not crash if you start Netflix without the provisioning module being active',
  steps: [
    {
      description: 'Stop Provisioning',
      test: pluginDeactivate,
      params: constants.provisioningPlugin,
      assert: 'deactivated',
    },
    {
      description: 'Stop NetFlix plugin',
      test: pluginDeactivate,
      params: constants.netFlixPlugin,
      assert: 'deactivated',
    },
    {
      description: 'Start Netflix Plugin',
      test: pluginActivate,
      params: constants.netFlixPlugin,
      assert: 'activated',
    },
    {
      description: 'Check if Netflix is started without a valid ESN (screen stays blank)',
      sleep: 5,
      test() {
        return getNetflixPluginEsnInfo.call(this)
      },
      validate(res) {
        if (res.result !== undefined && res.result === '' && res.result.length === 0) {
          return true
        } else {
          this.$log('Expected Netflix to not have an ESN, yet it does')
          return false
        }
      },
    },
    {
      description: 'Stop NetFlix plugin',
      test: pluginDeactivate,
      params: constants.netFlixPlugin,
      assert: 'deactivated',
    },
    {
      description: 'Start provisioning',
      test() {
        return startProvisioning.call(this)
      },
      assert: null,
    },
  ],
}
