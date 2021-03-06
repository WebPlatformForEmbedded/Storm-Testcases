import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'

let listener
let listenerArray = []

export default {
  title: 'Framework Controller Activate - 004',
  description: 'Activates Plugin and check whether plugin activated through Activation state',
  setup() {
    listener = this.$thunder.api.Controller.on('statechange', data => {
      listenerArray.push(data.state)
    })
  },
  plugin: [constants.controllerPlugin, constants.deviceInfo],
  teardown() {
    listener.dispose()
  },
  steps: [
    {
      description: 'Deactivating plugin',
      test() {
        pluginDeactivate.call(this, constants.deviceInfo)
      },
    },
    {
      description: 'Activating plugin and check the state',
      test() {
        return pluginActivate.call(this, constants.deviceInfo)
      },
      validate(res) {
        if (res == 'activated') {
          return true
        } else {
          throw new Error(`Plugin not Activated and state is ${res}`)
        }
      },
    },
  ],
  validate() {
    return listenerArray.includes('Activation')
  },
}
