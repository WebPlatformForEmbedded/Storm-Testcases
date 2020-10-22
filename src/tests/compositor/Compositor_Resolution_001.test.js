import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import { getCompositorResolution, setCompositorResolution } from '../../commonMethods/compositor'
import constants from '../../commonMethods/constants'

export default {
  title: 'Compositor Resolution - 001',
  description: 'Sets the resolution to 480i and checks whether the same resolution is set or not',
  context: {
    resolution: '480i',
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
      description: 'Set Compositor resolution and validate the result',
      sleep: 10,
      test() {
        return setCompositorResolution.call(this, this.$context.read('resolution'))
      },
      validate(res) {
        if (res == null) {
          return true
        } else {
          throw new Error('Result is not as expected while setting compositor resolution')
        }
      },
    },
    {
      description: 'Get Compositor resolution and validate the result',
      sleep: 10,
      test() {
        return getCompositorResolution.call(this)
      },
      validate(res) {
        if (res == this.$context.read('resolution')) {
          return true
        } else {
          throw new Error(`Resolution not set to  ${this.$context.read('resolution')}`)
        }
      },
    },
  ],
}
