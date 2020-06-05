import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import { syncTime } from '../../commonMethods/timeSync'
import constants from '../../commonMethods/constants'

export default {
  title: 'TimeSync - Synchronize 001',
  description: 'Check the Synchronize Functionality of TimeSync Module',
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, constants.timeSyncPlugin),
      () => pluginActivate.call(this, constants.timeSyncPlugin),
    ])
  },
  steps: [
    {
      description: 'Invoke Time Synchronize',
      sleep: 5,
      test() {
        return syncTime.call(this)
      },
      validate(res) {
        if (res == null) {
          return true
        } else {
          throw new Error('Sync does not start')
        }
      },
    },
  ],
}
