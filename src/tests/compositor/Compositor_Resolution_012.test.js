import { setCompositorResolution } from '../../commonMethods/compositor'
import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'

export default {
  title: 'Compositor Resolution - 012',
  description: 'Sets the resolution to invalid and validate the result',
  context: {
    resolution: 'invalidres',
  },
  plugin: [constants.compositorPlugin],
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, constants.compositorPlugin),
      () => pluginActivate.call(this, constants.compositorPlugin),
    ])
  },
  steps: [
    {
      description: 'Set Compositor resolution to invalid and validate the result',
      test() {
        return setCompositorResolution.call(this, this.$context.read('resolution'))
      },
      validate(res) {
        if (res.code == 22 && res.message == 'ERROR_UNKNOWN_KEY') {
          return true
        } else {
          throw new Error('Error is is not as expected and is ' + res.message)
        }
      },
    },
  ],
}
