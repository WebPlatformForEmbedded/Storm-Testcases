import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'
import { addRemoteControlKey } from '../../commonMethods/remoteControl'

export default {
  title: 'RemoteControl Add - 002',
  description: 'Add already existing key and validates the result',
  context: {
    deviceName: 'DevInput',
    keyCode: '1',
    key: 103,
  },
  plugin: [constants.remoteControlPlugin],
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
        if (res.code === 22 && res.message === 'ERROR_UNKNOWN_KEY') {
          return true
        } else {
          throw new Error(
            `Invalid error message shown while adding already existing key and Error: {code: ${res.code}, message:${res.message}}`
          )
        }
      },
    },
  ],
}
