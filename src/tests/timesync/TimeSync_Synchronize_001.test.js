import { pluginDeactivate, pluginActivate, syncTime } from '../../commonMethods/commonFunctions'
import constants from '../../commonMethods/constants'

export default {
  title: 'Time Synchronize 001',
  description: 'Check the Synchronize Functionality of TimeSync Module',
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
      validate(res) {
        //TODO - Implement Proper validation to check whether the time Synchronization is completed
        if (res == null) {
          return true
        } else {
          this.$log('Sync does not start')
          return false
        }
      },
    },
  ],
}
