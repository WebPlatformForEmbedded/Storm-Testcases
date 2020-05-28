import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import { getDRMKeySystemInfo } from '../../commonMethods/ocdm'
import constants from '../../commonMethods/constants'

export default {
  title: 'OCDM  - Keysystems 002',
  description: 'Check OCDM Keysystems info with invalid KeySystem',
  steps: [
    {
      description: 'Check if OCDM Plugin is stopped correctly',
      test: pluginDeactivate,
      params: constants.ocdmPlugin,
      assert: 'deactivated',
    },
    {
      description: 'Check if OCDM Plugin is started correctly',
      test: pluginActivate,
      params: constants.ocdmPlugin,
      assert: 'activated',
    },
    {
      description: 'Get DRM KeySystem info',
      test() {
        return getDRMKeySystemInfo.call(this, 'invalidDRM')
      },
      validate(res) {
        if (res.code === 30 && res.message === 'ERROR_BAD_REQUEST') {
          return true
        } else {
          throw new Error('Proper error message is not shown')
        }
      },
    },
  ],
}
