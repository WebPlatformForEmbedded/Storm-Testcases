import { startDiscovery } from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'

export default {
  title: 'Framework Start Discovery test - 001',
  description: 'Starts Discovery',
  plugin: [constants.controllerPlugin],
  steps: [
    {
      description: 'Start Discovery and validate the result',
      test() {
        return startDiscovery.call(this, 1)
      },
      validate(res) {
        if (res == null) {
          return true
        } else {
          throw new Error(`Result is not as expected in startDiscovery and is ${res}`)
        }
      },
    },
  ],
}
