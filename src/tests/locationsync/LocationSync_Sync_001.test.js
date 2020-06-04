import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import { getLocation, syncLocation } from '../../commonMethods/locationSync'
import constants from '../../commonMethods/constants'

export default {
  title: 'Location - Sync 001',
  description:
    'Check the Sync Functionality of LocationSync Module and validate the location information',
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, constants.locationSyncPlugin),
      () => pluginActivate.call(this, constants.locationSyncPlugin),
    ])
  },
  steps: [
    {
      description: 'Invoke Sync',
      sleep: 5,
      test() {
        return syncLocation.call(this) //TODO - Add code to make sure the Sync is completed
      },
      validate(res) {
        if (res == null) {
          return true
        } else {
          throw new Error('Error occurred while syncing location')
        }
      },
    },
    {
      description: 'Invoke Get location and validate the result',
      sleep: 10,
      test() {
        return getLocation.call(this)
      },
      validate(res) {
        if (
          res.city != null &&
          res.country != null &&
          res.region != null &&
          res.timezone != null &&
          res.publicip != null
        ) {
          return true
        } else {
          throw new Error('Error in getting location info')
        }
      },
    },
  ],
}
