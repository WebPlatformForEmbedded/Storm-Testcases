import {
  pluginDeactivate,
  pluginActivate,
  startProvisioning,
  getPluginInfo,
} from '../../commonMethods/commonFunctions'
import constants from '../../commonMethods/constants'

export default {
  title: 'Netflix provisioning tests',
  description: 'Validate if Netflix can start without provisioning',
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
    },
    {
      description: 'Check if Netflix is started without a valid ESN (screen stays blank)',
      sleep: 5,
      test() {
        return getPluginInfo.call(this, constants.netFlixPlugin)
      },
      validate(res) {
        if (res.status > 400) {
          this.$log('Netflix plugin is responding with an error')
        }
        if (res.data.esn !== undefined && res.data.esn === '' && res.data.esn.length === 0) {
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
