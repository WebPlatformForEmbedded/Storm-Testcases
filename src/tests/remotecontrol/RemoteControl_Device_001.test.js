import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'
import { getMetadataofRemoteControlDevice } from '../../commonMethods/remoteControl'

export default {
  title: 'RemoteControl Device - 001',
  description: 'Gets the metadata of specified RemoteControl Device and validate the result',
  context: {
    deviceName: 'DevInput',
  },
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, constants.remoteControlPlugin),
      () => pluginActivate.call(this, constants.remoteControlPlugin),
    ])
  },
  steps: [
    {
      description: 'Gets meta data of remote control device and validate the result',
      test() {
        return getMetadataofRemoteControlDevice.call(this, this.$context.read('deviceName'))
      },
      validate(res) {
        if (res.metadata === this.$context.read('deviceName')) {
          return true
        } else {
          throw new Error(`Metadata is incorrect and is ${res}`)
        }
      },
    },
  ],
}
