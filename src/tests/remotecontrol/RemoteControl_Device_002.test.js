import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'
import { getMetadataofRemoteControlDevice } from '../../commonMethods/remoteControl'

export default {
  title: 'RemoteControl Device - 002',
  description: 'Gets the metadata of invalid RemoteControl Device and validate the result',
  context: {
    deviceName: 'invalidDevice',
  },
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, constants.remoteControlPlugin),
      () => pluginActivate.call(this, constants.remoteControlPlugin),
    ])
  },
  steps: [
    {
      description: 'Gets meta data of invalid remote control device and validate the result',
      test() {
        return getMetadataofRemoteControlDevice.call(this, this.$context.read('deviceName'))
      },
      validate(res) {
        if (res.code === 2 && res.message === 'ERROR_UNAVAILABLE') {
          return true
        } else {
          throw new Error(`Metadata is incorrect and is ${res}`)
        }
      },
    },
  ],
}
