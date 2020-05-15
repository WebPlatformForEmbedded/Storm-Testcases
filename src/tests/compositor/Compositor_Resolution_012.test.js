import {
  pluginDeactivate,
  pluginActivate,
  setCompositorResolution,
  getCompositorResolution,
} from '../../commonMethods/commonFunctions'
import constants from '../../commonMethods/constants'

export default {
  title: 'Compositor Resolution - 012',
  description: 'Sets the resolution to invalid and validate the result',
  context: {
    resolution: 'invalidres',
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
          this.$log('Error is is not as expected and is ' + res.message)
          return false
        }
      },
    },
  ],
}
