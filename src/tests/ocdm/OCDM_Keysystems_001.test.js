import {
  pluginDeactivate,
  pluginActivate,
  getDRMSList,
  getDRMKeySystemInfo,
} from '../../commonMethods/commonFunctions'

import constants from '../../commonMethods/constants'

export default {
  title: 'OCDM Keysystems  001',
  description: 'Check OCDM Keysystems info',
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
      description: 'Get DRMS list',
      test: getDRMSList,
      validate(result) {
        this.$data.write('drmlist', result)
        if (result === undefined || result.length === 0) {
          this.$log('DRM list not available')
          return false
        } else {
          return true
        }
      },
    },
    {
      description: 'Get DRM KeySystem info',
      test() {
        let drmlist = this.$data.read('drmlist')
        this.$log('DRM list info', drmlist[0].name)
        return getDRMKeySystemInfo.call(this, drmlist[0].name)
      },
      validate(result) {
        if (result === undefined || result.length === 0) {
          this.$log('DRM info not available')
          return false
        } else {
          return true
        }
      },
    },
  ],
}
