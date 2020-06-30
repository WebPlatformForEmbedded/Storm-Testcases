import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'
import { getMetadataofRemoteControlDevice } from '../../commonMethods/remoteControl'

export default {
  title: 'RemoteControl Device - 003',
  description: 'Gets the metadata of virtual Device and validate the result',
  context: {
    deviceName: 'Web',
  },
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, constants.remoteControlPlugin),
      () => pluginActivate.call(this, constants.remoteControlPlugin),
    ])
  },
  steps: [
    {
      description: 'Gets meta data of virtual device and validate the result',
      test() {
        return getMetadataofRemoteControlDevice.call(this, this.$context.read('deviceName'))
      },
      validate(res) {
        if (res.code == '1' && res.message === 'ERROR_GENERAL') {
          return true
        } else {
          throw new Error(`Metadata is incorrect and is ${res}`)
        }
      },
    },
  ],
}
