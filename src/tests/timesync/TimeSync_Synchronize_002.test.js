import { pluginDeactivate, pluginActivate, syncTime } from '../../commonMethods/commonFunctions'
import constants from '../../commonMethods/constants'

export default {
  title: 'Time Synchronize 002',
  description:
    'Check the Synchronize Functionality of TimeSync Module when Sync is already in progress',
  steps: [
    {
      description: 'Check if TimeSync Plugin is stopped correctly',
      test: pluginDeactivate,
      params: constants.timeSyncPlugin,
      assert: 'deactivated',
    },
    {
      description: 'Check if Time Sync Plugin is started correctly',
      test: pluginActivate,
      params: constants.timeSyncPlugin,
      assert: 'activated',
    },
    {
      description: 'Invoke Time Synchronize',
      sleep: 5,
      test() {
        return syncTime.call(this)
      },
    },
    {
      description: 'Invoke Time Synchronize again and validate error message',
      test() {
        return syncTime.call(this)
      },
      validate(res) {
        if (res.code === 12 && res.message === 'ERROR_INPROGRESS') {
          return true
        } else {
          this.$log('Proper error message is not shown')
          return false
        }
      },
    },
  ],
}
