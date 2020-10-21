import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import { getDRMKeySystemInfo } from '../../commonMethods/ocdm'
import constants from '../../commonMethods/constants'

export default {
  title: 'OCDM  - Keysystems 002',
  description: 'Check OCDM Keysystems info with invalid KeySystem',
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, constants.ocdmPlugin),
      () => pluginActivate.call(this, constants.ocdmPlugin),
    ])
  },
  steps: [
    {
      description: 'Get DRM KeySystem info',
      test() {
        return getDRMKeySystemInfo.call(this, 'invalidDRM')
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
