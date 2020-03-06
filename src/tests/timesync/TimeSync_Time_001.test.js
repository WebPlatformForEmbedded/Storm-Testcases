import {
  pluginDeactivate,
  pluginActivate,
  getCurrentTime,
} from '../../commonMethods/commonFunctions'
import constants from '../../commonMethods/constants'

export default {
  title: 'TimeSync - GetTime 001',
  description: 'Check the latest Time returned from TimeSync Module',
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
      description: 'Invoke Time to get current time',
      sleep: 5,
      test() {
        return getCurrentTime.call(this)
      },
      validate(res) {
        //TODO - Implement Proper validation to check whether the current time is returned
        if (res == null) {
          return true
        } else {
          this.$log('Current Time is not provided')
          return false
        }
      },
    },
  ],
}
