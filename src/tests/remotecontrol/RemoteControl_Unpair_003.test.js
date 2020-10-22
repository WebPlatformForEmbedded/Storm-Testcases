import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'
import { unpairFunctionForError } from '../../commonMethods/remoteControl'

export default {
  title: 'RemoteControl Unpair - 002 ',
  description: 'Validate Thunder response when Pair is invoked with Invalid Json Format',
  context: {
    deviceName: 'invalidDevice',
    bindingID: 'id',
  },
  plugin: [constants.locationSyncPlugin],
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, constants.remoteControlPlugin),
      () => pluginActivate.call(this, constants.remoteControlPlugin),
    ])
  },
  steps: [
    {
      description: 'Invoke unpair with invalid json format and validate the result',
      test() {
        return unpairFunctionForError.call(
          this,
          this.$context.read('deviceName'),
          this.$context.read('bindingID')
        )
      },
      validate(res) {
        if (res.code === 30 && res.message === 'ERROR_BAD_REQUEST') {
          return true
        } else {
          throw new Error(
            `Error message is improper while invoking unpair device with invalid json format and Error: {code: ${res.code}, message:${res.message}}`
          )
        }
      },
    },
  ],
}
