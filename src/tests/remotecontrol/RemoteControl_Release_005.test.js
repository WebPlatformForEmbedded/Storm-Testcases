import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'
import { releaseKey } from '../../commonMethods/remoteControl'

export default {
  title: 'RemoteControl Release - 005',
  description: 'Validate Thunder response when Release is invoked with Invalid Json Format',
  context: {
    deviceName: 'Web',
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
      description: 'Invoke Send with invalid json format and validate the result',
      test() {
        return releaseKey.call(this, this.$context.read('deviceName'), this.$context.read('code'))
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
