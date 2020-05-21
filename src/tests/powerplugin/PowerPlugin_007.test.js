import { setPowerState } from '../../commonMethods/powerPlugin'
import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'

export default {
  title: 'Power Plugin - 007',
  description: 'Sets invalid Power state and validate the result',
  context: {
    powerState: 'invalid',
    timeOut: 0,
  },
  steps: [
    {
      description: 'Deactivate Power Plugin and check deactivated or not',
      test: pluginDeactivate,
      params: constants.powerPlugin,
      assert: 'deactivated',
    },
    {
      description: 'Activate Power Plugin and check activated or not',
      test: pluginActivate,
      params: constants.powerPlugin,
      assert: 'activated',
    },
    {
      description: 'Set power state and validate the result',
      test() {
        return setPowerState.call(
          this,
          this.$context.read('invalid'),
          this.$context.read('timeOut')
        )
      },
      validate(res) {
        if (res.code === 2 && res.message === 'ERROR_UNAVAILABLE') {
          return true
        } else {
          throw new Error('Proper error message is not shown')
        }
      },
    },
  ],
}
