import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'
import { releaseKey } from '../../commonMethods/remoteControl'

export default {
  title: 'RemoteControl Release - 004',
  description: 'Releases already released key and validate the result',
  context: {
    deviceName: 'Web',
    code: '1',
  },
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, constants.remoteControlPlugin),
      () => pluginActivate.call(this, constants.remoteControlPlugin),
    ])
  },
  steps: [
    {
      description: 'Release already released key device and validates the result',
      test() {
        return releaseKey.call(this, this.$context.read('deviceName'), this.$context.read('code'))
      },
      validate(res) {
        if (res.code === 36 && res.message === 'ERROR_ALREADY_RELEASED') {
          return true
        } else {
          throw new Error(`Release key code returned wrong result and is ${res}`)
        }
      },
    },
  ],
}
