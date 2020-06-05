import constants from '../../commonMethods/constants'
import { putBelow } from '../../commonMethods/compositor'
import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'

export default {
  title: 'Compositor Putbelow Functionality - 002',
  description: 'Checks the putbelow functionality for invalid plugin',
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, constants.compositorPlugin),
      () => pluginActivate.call(this, constants.compositorPlugin),
    ])
  },
  steps: [
    {
      description: 'Put Invalid plugin below UX plugin',
      test() {
        return putBelow.call(this, constants.invalidPlugin, constants.uxplugin)
      },
      validate(res) {
        if (res.code == 34 && res.message == 'ERROR_FIRST_RESOURCE_NOT_FOUND') {
          return true
        } else {
          throw new Error('Error message improper when Invalid plugin is putbelow UX plugin')
        }
      },
    },
  ],
}
