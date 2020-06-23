import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'
import { addRemoteControlKey, deleteRemoteControlKey } from '../../commonMethods/remoteControl'

export default {
  title: 'RemoteControl Add - 002',
  description: 'Adds key to the invalid device and validates the result',
  context: {
    deviceName: 'invalidevice',
    keyCode: '1',
    key: 103,
  },
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, constants.remoteControlPlugin),
      () => pluginActivate.call(this, constants.remoteControlPlugin),
    ])
  },
  steps: [
    {
      description: 'Add remote control validates the result',
      test() {
        return addRemoteControlKey.call(
          this,
          this.$context.read('deviceName'),
          this.$context.read('keyCode'),
          this.$context.read('key')
        )
      },
      validate(res) {
        if (res.code == '2' && res.message === 'ERROR_UNAVAILABLE') {
          return true
        } else {
          throw new Error(`Error message is improper and is ${res}`)
        }
      },
    },
  ],
}
