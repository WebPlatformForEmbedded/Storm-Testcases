import constants from '../../commonMethods/constants'
import { setClientGeometry } from '../../commonMethods/compositor'
import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'

export default {
  title: 'Compositor Geometry - 003',
  description: 'Sets Geometry for invalid client and validates the result',
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, constants.compositorPlugin),
      () => pluginActivate.call(this, constants.compositorPlugin),
    ])
  },
  steps: [
    {
      description: 'Set invalid Client Geometry and validate the result',
      sleep: 5,
      test() {
        return setClientGeometry.call(this, constants.invalidPlugin, '1', '1', '480', '360')
      },
      validate(res) {
        if (res.code === 2 && res.message === 'ERROR_UNAVAILABLE') {
          return true
        } else {
          throw new Error('Invalid error message')
        }
      },
    },
  ],
}
