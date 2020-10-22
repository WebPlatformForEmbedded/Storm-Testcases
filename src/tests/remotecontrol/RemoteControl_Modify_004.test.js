import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'
import { modifyRemoteControlKey } from '../../commonMethods/remoteControl'

export default {
  title: 'RemoteControl Modify - 004',
  description: 'Validate Thunder response when Modify is invoked with Invalid Json Format',
  context: {
    deviceName: 'DevInput',
    keyCode: '1,',
    key: 103,
    modifier: ['leftshift'],
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
      description: 'Invoke Modify with invalid json format and validate the result',
      test() {
        return modifyRemoteControlKey.call(
          this,
          this.$context.read('deviceName'),
          this.$context.read('keyCode'),
          this.$context.read('key'),
          this.$context.read('modifier')
        )
      },
      validate(res) {
        if (res.code === 30 && res.message === 'ERROR_BAD_REQUEST') {
          return true
        } else {
          throw new Error(
            `Error message is improper while modifying key code with invalid json formatand Error: {code: ${res.code}, message:${res.message}}`
          )
        }
      },
    },
  ],
}
