import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'
import { saveDeviceKeyMap, saveFunctionForError } from '../../commonMethods/remoteControl'

export default {
  title: 'RemoteControl Save - 003',
  description: 'Validate Thunder response when Save is invoked with Invalid Json Format',
  context: {
    deviceName: 'DevInput,',
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
      description: 'Invoke Save with invalid json format and validate the result',
      test() {
        return saveFunctionForError.call(this, this.$context.read('deviceName'))
      },
      validate(res) {
        if (res.code === 30 && res.message === 'ERROR_BAD_REQUEST') {
          return true
        } else {
          throw new Error(
            `Error message is improper while saving keycode with invalid json format and Error: {code: ${res.code}, message:${res.message}}`
          )
        }
      },
    },
  ],
}
