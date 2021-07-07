import { firmwareUpgrade } from '../../commonMethods/firmwarecontrol'
import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'

export default {
  title: 'Firmware Upgrade - 002',
  description: 'Check the upgrade Functionality when upgrade is already in progress',
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, constants.firmwareUpgradePlugin),
      () => pluginActivate.call(this, constants.firmwareUpgradePlugin),
    ])
  },
  steps: [
    {
      description:
        'Invoke Upgrade firmware when already firmware upgrade in progres and validate the result',
      sleep: 5,
      test() {
        //TODO - Update the test to enter the 'name', 'location', 'type', 'progressinterval', 'hmac' through User prompt
        firmwareUpgrade.call(this, 'name', 'location', 'type', 'progressinterval', 'hmac')
        return firmwareUpgrade.call(this, 'name', 'location', 'type', 'progressinterval', 'hmac')
      },
      validate(res) {
        if (res.code === 12 && res.message === 'ERROR_INPROGRESS') {
          return true
        } else {
          this.$log('Proper error message is not shown')
          return false
        }
      },
    },
  ],
}
