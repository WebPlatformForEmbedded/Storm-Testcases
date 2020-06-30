import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'
import { pairRemoteControlDevice } from '../../commonMethods/remoteControl'

export default {
  title: 'RemoteControl Pair - 002 ',
  description: 'Pairs with the invalid device and validates the result',
  context: {
    deviceName: 'invalidDevice',
  },
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, constants.remoteControlPlugin),
      () => pluginActivate.call(this, constants.remoteControlPlugin),
    ])
  },
  steps: [
    {
      description: 'Pairs with invalid device and validates the result',
      test() {
        return pairRemoteControlDevice.call(this, this.$context.read('deviceName'))
      },
      validate(res) {
        if (res.code === 2 && res.message === 'ERROR_UNAVAILABLE') {
          return true
        } else {
          throw new Error(`Error message is improper and is ${res}`)
        }
      },
    },
  ],
}
