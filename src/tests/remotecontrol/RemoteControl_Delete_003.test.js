import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'
import { deleteRemoteControlKey } from '../../commonMethods/remoteControl'

export default {
  title: 'RemoteControl Delete - 003',
  description: 'Deletes invalid key from the device and validates the result',
  context: {
    deviceName: 'Web',
    keyCode: '10000000000000000000000',
  },
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, constants.remoteControlPlugin),
      () => pluginActivate.call(this, constants.remoteControlPlugin),
    ])
  },
  steps: [
    {
      description: 'Delete invalid key and validates the result',
      test() {
        return deleteRemoteControlKey.call(
          this,
          this.$context.read('deviceName'),
          this.$context.read('keyCode')
        )
      },
      validate(res) {
        if (res.code === 22 && res.message === 'ERROR_UNKNOWN_KEY') {
          return true
        } else {
          throw new Error(
            `Invalid error message shown while deleting invalid key and Error: {code: ${res.code}, message:${res.message}}`
          )
        }
      },
    },
  ],
}
