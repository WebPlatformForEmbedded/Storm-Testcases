import { setPowerState } from '../../commonMethods/powerPlugin'
import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'

export default {
  title: 'Power Plugin - 004',
  description: 'Sets the Power state to already existing power state and validate the result',
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, constants.powerPlugin),
      () => pluginActivate.call(this, constants.powerPlugin),
    ])
  },
  context: {
    powerState: 'on',
    timeOut: 0,
  },
  steps: [
    {
      description: 'Set power state and validate the result',
      test() {
        return setPowerState.call(
          this,
          this.$context.read('powerState'),
          this.$context.read('timeOut')
        )
      },
      validate(res) {
        if (res === null) {
          return true
        } else {
          throw new Error('Error while setting the power state')
        }
      },
    },
    {
      description: 'Set power state to on and validate the result',
      test() {
        return setPowerState.call(
          this,
          this.$context.read('powerState'),
          this.$context.read('timeOut')
        )
      },
      validate(res) {
        if (res.code === 29 && res.message === 'ERROR_DUPLICATE_KEY') {
          return true
        } else {
          throw new Error('Proper error message is not shown')
        }
      },
    },
  ],
}
