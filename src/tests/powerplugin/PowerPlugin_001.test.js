import { setPowerState, getPowerState } from '../../commonMethods/powerPlugin'
import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'

export default {
  title: 'Power Plugin - 001',
  description: 'Sets the Power state to On and validate the result',
  context: {
    powerState: 'on',
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
      description: 'Get power state and validate whether it is as per the setted power state',
      test() {
        return getPowerState.call(this)
      },
      validate(res) {
        if (res === this.$context.read('powerState')) {
          return true
        } else {
          throw new Error(`Power state not set to ${this.$context.read('powerState')}`)
        }
      },
    },
  ],
}
