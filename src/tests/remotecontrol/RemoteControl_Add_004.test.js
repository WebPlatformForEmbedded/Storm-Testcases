import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'
import { addRemoteControlKey } from '../../commonMethods/remoteControl'

export default {
  title: 'RemoteControl Add - 004',
  description: 'Validate Thunder response when Add is invoked with Invalid Json Format',
  context: {
    deviceName: 'DevInput',
    keyCode: '1,',
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
      description: 'Invoke Add with invalid json format and validate the result',
      test() {
        return addRemoteControlKey.call(
          this,
          this.$context.read('deviceName'),
          this.$context.read('keyCode'),
          this.$context.read('key')
        )
      },
      validate(res) {
        if (res.code === 30 && res.message === 'ERROR_BAD_REQUEST') {
          return true
        } else {
          throw new Error(
            `Error message is improper while adding a key with invalid json format and Error: {code: ${res.code}, message:${res.message}}`
          )
        }
      },
    },
  ],
}
