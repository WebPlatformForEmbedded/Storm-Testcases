import { setCompositorResolution, getCompositorResolution } from '../../commonMethods/compositor'
import { pluginDeactivate, pluginActivate } from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'

export default {
  title: 'Compositor Resolution - 001',
  description: 'Sets the resolution to 480i and checks whether the same resolution is set or not',
  context: {
    resolution: '480i',
  },
  steps: [
    {
      description: 'Deactivate Netflix Plugin and check deactivated or not',
      test: pluginDeactivate,
      params: constants.netFlixPlugin,
      assert: 'deactivated',
    },
    {
      description: 'Activate Netflix Plugin and check resumed or not',
      test: pluginActivate,
      params: constants.netFlixPlugin,
      assert: 'resumed',
    },
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
          this.$log('Result is not as expected')
          return false
        }
      },
    },
    {
      description: 'Get Compositor Clients and validate the result',
      sleep: 10,
      test() {
        return getCompositorResolution.call(this)
      },
      validate(res) {
        if (res == this.$context.read('resolution')) {
          return true
        } else {
          this.$log('Resolution not set to ' + this.$context.read('resolution'))
          return false
        }
      },
    },
  ],
}
