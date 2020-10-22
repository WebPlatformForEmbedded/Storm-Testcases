import { setPowerState } from '../../commonMethods/powerPlugin'
import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'

export default {
  title: 'Power Plugin - 005',
  description: 'Sets invalid Power state and validate the result',
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, constants.powerPlugin),
      () => pluginActivate.call(this, constants.powerPlugin),
    ])
  },
  plugin: [constants.powerPlugin],
  context: {
    powerState: 'invalid',
    timeOut: 0,
  },
  steps: [
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
        if (res.code === 30 && res.message === 'ERROR_BAD_REQUEST') {
          return true
        } else {
          throw new Error(
            `Proper error message is not shown and Error: {code: ${res.code}, message:${res.message}}`
          )
        }
      },
    },
  ],
}
