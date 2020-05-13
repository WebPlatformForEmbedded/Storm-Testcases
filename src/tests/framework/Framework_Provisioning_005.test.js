import { startProvisioning } from '../../commonMethods/provisioning'
import { pluginDeactivate, pluginActivate } from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'

export default {
  title: 'Framework provisioning - 005',
  description:
    'Check error message when Provisioning is performed while previous provisioning request is in progress',
  steps: [
    {
      description: 'Check if Provisioning Plugin is stopped correctly',
      test: pluginDeactivate,
      params: constants.provisioningPlugin,
      assert: 'deactivated',
    },
    {
      description: 'Check if Provisioning Plugin is started correctly',
      test: pluginActivate,
      params: constants.provisioningPlugin,
      assert: 'activated',
    },
    {
      description: 'Invoke Start Provisioning',
      sleep: 5,
      test() {
        return startProvisioning.call(this)
      },
      validate(res) {
        if (res == null) {
          return true
        } else {
          this.$log('Scan does not start')
          return false
        }
      },
    },
    {
      description: 'Invoke Start Provisioning',
      test() {
        return startProvisioning.call(this)
      },
      validate(res) {
        if (res.code == 12 && res.message == 'ERROR_INPROGRESS') {
          return true
        } else {
          this.$log('Proper error message is not shown')
          return false
        }
      },
    },
  ],
}
