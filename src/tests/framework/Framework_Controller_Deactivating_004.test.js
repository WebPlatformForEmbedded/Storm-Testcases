import { pluginActivate, pluginDeactivate } from '../../commonMethods/commonFunctions'
import constants from '../../commonMethods/constants'

let listener
let listenerArray = []
export default {
  title: 'Framework Controller Deactivate - 004',
  description: 'Deactivates Plugin and check whether plugin deactivated through deactivation state',
  setup() {
    listener = this.$thunder.api.Controller.on('statechange', data => {
      listenerArray.push(data.state)
    })
  },
  steps: [
    {
      description: 'Activating plugin',
      test() {
        pluginActivate.call(this, constants.deviceInfo)
      },
    },
    {
      description: 'Deactivating plugin and check the state',
      test() {
        return pluginDeactivate.call(this, constants.deviceInfo)
      },
      validate(res) {
        if (res == 'deactivated') {
          return true
        } else {
          this.$log('Plugin not Activated', res)
          return false
        }
      },
    },
  ],
  validate() {
    return listenerArray.includes('Deactivation')
  },
}
