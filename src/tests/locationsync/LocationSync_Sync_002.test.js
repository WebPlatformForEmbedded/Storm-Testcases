import {
  pluginDeactivate,
  pluginActivate,
  syncTime,
  syncLocation,
} from '../../commonMethods/commonFunctions'
import constants from '../../commonMethods/constants'

export default {
  title: 'LocationSync - Sync 002',
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
      description: 'Invoke Location Sync',
      sleep: 5,
      test() {
        return syncLocation.call(this)
      },
      val(res) {
        if (res === null) {
          return true
        } else {
          this.$log('Location Sync not started')
          return false
        }
      },
    },
    {
      description: 'Invoke Location Sync again and validate error message',
      test() {
        return syncLocation.call(this)
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
