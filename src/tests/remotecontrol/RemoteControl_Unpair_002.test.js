import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'
import { unpairRemoteControlDevice } from '../../commonMethods/remoteControl'

export default {
  title: 'RemoteControl Unpair - 002 ',
  description: 'Unpairs with the invalid device and validates the result',
  context: {
    deviceName: 'invalidDevice',
    bindingID: 'id',
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
      description: 'Unpairs with invalid device and validates the result',
      test() {
        return unpairRemoteControlDevice.call(
          this,
          this.$context.read('deviceName'),
          this.$context.read('bindingID')
        )
      },
      validate(res) {
        if (res.code === 2 && res.message === 'ERROR_UNAVAILABLE') {
          return true
        } else {
          throw new Error(
            `Error message is improper while unpairing with invalid device and Error: {code: ${res.code}, message:${res.message}}`
          )
        }
      },
    },
  ],
}
