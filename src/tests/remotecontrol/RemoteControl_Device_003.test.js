import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'
import { getMetadataofRemoteControlDevice } from '../../commonMethods/remoteControl'

export default {
  title: 'RemoteControl Device - 003',
  description: 'Gets the metadata of invalid Device and validate the result',
  context: {
    deviceName: 'invalidevice',
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
      description: 'Gets meta data of invalid device and validate the result',
      test() {
        return getMetadataofRemoteControlDevice.call(this, this.$context.read('deviceName'))
      },
      validate(res) {
        if (res.code === 2 && res.message === 'ERROR_UNAVAILABLE') {
          return true
        } else {
          throw new Error(`Error message is incorrect and is ${res}`)
        }
      },
    },
  ],
}
