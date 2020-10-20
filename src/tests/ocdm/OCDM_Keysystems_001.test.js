import constants from '../../commonMethods/constants'
import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import { getDRMKeySystemInfo, getDRMSList } from '../../commonMethods/ocdm'

export default {
  title: 'OCDM - Keysystems  001',
  description: 'Check OCDM Keysystems info',
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, constants.ocdmPlugin),
      () => pluginActivate.call(this, constants.ocdmPlugin),
    ])
  },
  plugin: [constants.ocdmPlugin],
  steps: [
    {
      description: 'Get DRMS list',
      test: getDRMSList,
      validate(result) {
        this.$data.write('drmlist', result)
        if (result === undefined || result.length === 0) {
          throw new Error('DRM list not available')
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
          throw new Error('DRM info not available')
        } else {
          return true
        }
      },
    },
  ],
}
