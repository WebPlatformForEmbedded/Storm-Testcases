import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'
import { loadDeviceKeyMap, loadFunctionForError } from '../../commonMethods/remoteControl'

export default {
  title: 'RemoteControl Load - 003 ',
  description: 'Validate Thunder response when Load is invoked with Invalid Json Format',
  context: {
    deviceName: 'DevInput',
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
      description: 'Invoke Load with invalid json format and validate the result',
      test() {
        return loadFunctionForError.call(this, this.$context.read('deviceName'))
      },
      validate(res) {
        if (res.code === 30 && res.message === 'ERROR_BAD_REQUEST') {
          return true
        } else {
          throw new Error(`Error message is improper and is ${res}`)
        }
      },
    },
  ],
}
