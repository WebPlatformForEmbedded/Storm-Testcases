import constants from '../../commonMethods/constants'
import { getClientGeometry } from '../../commonMethods/compositor'
import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'

export default {
  title: 'Compositor Geometry - 002',
  description: 'Gets Geometry of invalid client and validates the result',
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, constants.compositorPlugin),
      () => pluginActivate.call(this, constants.compositorPlugin),
    ])
  },
  steps: [
    {
      description: 'Get Compositor Geometry for invalid client and validate the result',
      test() {
        return getClientGeometry.call(this, constants.invalidPlugin)
      },
      validate(res) {
        if (res.code === 2 && res.message === 'ERROR_UNAVAILABLE') {
          return true
        } else {
          throw new Error(
            `Proper error message is not shown while getting the Geometry for invalid Client and Error: {code: ${res.code}, message:${res.message}}`
          )
        }
      },
    },
  ],
}
