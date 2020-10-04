import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'
import { getMetadataofRemoteControlDevice } from '../../commonMethods/remoteControl'

export default {
  title: 'RemoteControl Device - 002',
  description: 'Gets the metadata of virtual RemoteControl Device and validate the result',
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
      description: 'Gets meta data of virtual remote control device and validate the result',
      test() {
        return getMetadataofRemoteControlDevice.call(this, this.$context.read('deviceName'))
      },
      validate(res) {
        if (res.code == '1' && res.message === 'ERROR_GENERAL') {
          return true
        } else {
          throw new Error(
            `Invalid error message in getting metadata of virtual remote and Error: {code: ${res.code}, message:${res.message}}`
          )
        }
      },
    },
  ],
}
