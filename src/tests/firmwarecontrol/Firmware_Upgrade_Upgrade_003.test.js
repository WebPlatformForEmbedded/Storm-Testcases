import { firmwareUpgrade } from '../../commonMethods/firmwarecontrol'
import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'

export default {
  title: 'Firmware Upgrade - 002',
  description: 'Check the upgrade Functionality when upgrade is already in progress',
  context: {
    invalidURL: 'incorrectURL',
  },
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
        return firmwareUpgrade.call(
          this,
          'firmware_v.0',
          this.$context.read('invalidURL'),
          'CDL',
          '10',
          'hmac'
        )
      },
      validate(res) {
        if (res.code === 15 && res.message === 'ERROR_INCORRECT_URL') {
          return true
        } else {
          this.$log('Proper error message is not shown')
          return false
        }
      },
    },
  ],
}
