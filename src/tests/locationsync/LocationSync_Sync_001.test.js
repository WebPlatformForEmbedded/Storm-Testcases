import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import { getLocation, syncLocation } from '../../commonMethods/locationSync'
import constants from '../../commonMethods/constants'

export default {
  title: 'Location - Sync 001',
  description:
    'Check the Sync Functionality of LocationSync Module and validate the location information',
  steps: [
    {
      description: 'Check if LocationSync Plugin is stopped correctly',
      test: pluginDeactivate,
      params: constants.locationSyncPlugin,
      assert: 'deactivated',
    },
    {
      description: 'Check if Location Sync Plugin is started correctly',
      test: pluginActivate,
      params: constants.locationSyncPlugin,
      assert: 'activated',
    },
    {
      description: 'Invoke Sync',
      sleep: 5,
      test() {
        return syncLocation.call(this) //TODO - Add code to make sure the Sync is completed
      },
    },
    {
      description: 'Invoke Location Sync',
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
          this.$log('Error in getting location info')
          return false
        }
      },
    },
  ],
}
