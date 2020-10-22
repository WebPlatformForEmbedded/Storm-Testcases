import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'
import { deleteRemoteControlKey } from '../../commonMethods/remoteControl'

export default {
  title: 'RemoteControl Delete - 004',
  description: 'Validate Thunder response when Delete is invoked with Invalid Json Format',
  context: {
    deviceName: 'DevInput',
    keyCode: '1,',
  },
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, constants.remoteControlPlugin),
      () => pluginActivate.call(this, constants.remoteControlPlugin),
    ])
  },
  plugin: [constants.locationSyncPlugin],
  steps: [
    {
      description: 'Invoke delete with invalid json format and validate the result',
      test() {
        return deleteRemoteControlKey.call(
          this,
          this.$context.read('deviceName'),
          this.$context.read('keyCode')
        )
      },
      validate(res) {
        if (res.code === 30 && res.message === 'ERROR_BAD_REQUEST') {
          return true
        } else {
          throw new Error(
            `Error message is improper while deleting key with invalid json formaand Error: {code: ${res.code}, message:${res.message}}`
          )
        }
      },
    },
  ],
}
