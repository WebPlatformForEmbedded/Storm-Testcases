import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import { setCompositorResolution } from '../../commonMethods/compositor'
import constants from '../../commonMethods/constants'

export default {
  title: 'Compositor Resolution - 001',
  description: 'Sets the resolution to 480i and validates the result',
  context: {
    resolution: '480i',
  },

  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, constants.compositorPlugin),
      () => pluginActivate.call(this, constants.compositorPlugin),
    ])
  },
  steps: [
    {
      description: 'Set Compositor resolution and validate the result',
      sleep: 10,
      test() {
        return setCompositorResolution.call(this, this.$context.read('resolution'))
      },
      validate(res) {
        if (res.code === 2 && res.message === 'ERROR_UNAVAILABLE') {
          return true
        } else {
          throw new Error(`Result is not as expected and is ${res}`)
        }
      },
    },
  ],
}
