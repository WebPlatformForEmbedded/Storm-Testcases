import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'
import { pressKeyCodeToDevice } from '../../commonMethods/remoteControl'

export default {
  title: 'RemoteControl Press - 004',
  description: 'Validate Thunder response when Press is invoked with Invalid Json Format',
  context: {
    deviceName: 'DevInput',
    code: '1,',
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
      description: 'Invoke Press with invalid json format and validate the result',
      test() {
        return pressKeyCodeToDevice.call(
          this,
          this.$context.read('deviceName'),
          this.$context.read('code')
        )
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
