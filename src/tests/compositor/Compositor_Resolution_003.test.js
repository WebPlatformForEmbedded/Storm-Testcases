import { getCompositorResolution } from '../../commonMethods/compositor'
import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'

export default {
  title: 'Compositor Resolution - 003',
  description: 'Gets the resolution and validate the result',
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, constants.compositorPlugin),
      () => pluginActivate.call(this, constants.compositorPlugin),
    ])
  },
  steps: [
    {
      description: 'Get Compositor resolution to invalid and validate the result',
      sleep: 5,
      test() {
        return getCompositorResolution.call(this)
      },
      validate(res) {
        if (res !== null && res !== undefined) {
          return true
        } else {
          throw new Error(`Error is is not as expected and is ${res.message}`)
        }
      },
    },
  ],
}
