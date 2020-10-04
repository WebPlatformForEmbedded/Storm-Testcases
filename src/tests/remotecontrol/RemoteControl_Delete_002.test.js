import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'
import { deleteRemoteControlKey } from '../../commonMethods/remoteControl'

export default {
  title: 'RemoteControl Delete - 002',
  description: 'Deletes key from the invalid device and validates the result',
  context: {
    deviceName: 'invalidDevice',
    keyCode: '1',
  },
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, constants.remoteControlPlugin),
      () => pluginActivate.call(this, constants.remoteControlPlugin),
    ])
  },
  steps: [
    {
      description: 'Delete key from invalid device and validates the result',
      test() {
        return deleteRemoteControlKey.call(
          this,
          this.$context.read('deviceName'),
          this.$context.read('keyCode')
        )
      },
      validate(res) {
        if (res.code === 2 && res.message === 'ERROR_UNAVAILABLE') {
          return true
        } else {
          throw new Error(
            `Error message is improper while deleting key from invalid deviceand Error: {code: ${res.code}, message:${res.message}}`
          )
        }
      },
    },
  ],
}
