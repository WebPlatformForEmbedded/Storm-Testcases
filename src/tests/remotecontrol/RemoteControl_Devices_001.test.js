import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'
import { getRemoteControlDevices } from '../../commonMethods/remoteControl'

export default {
  title: 'RemoteControl Devices - 001',
  description: 'Gets the devices and validate the result',
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, constants.remoteControlPlugin),
      () => pluginActivate.call(this, constants.remoteControlPlugin),
    ])
  },
  steps: [
    {
      description: 'Get remote control devices and validate the result',
      test() {
        return getRemoteControlDevices.call(this)
      },
      validate(res) {
        if (res.includes('Web') && res.includes('DevInput')) {
          return true
        } else {
          throw new Error(`Remote control devices list is incorrect and is ${res}`)
        }
      },
    },
  ],
}
