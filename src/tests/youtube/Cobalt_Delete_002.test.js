import constants from '../../commonMethods/constants'
import { deleteFromDirectory } from '../../commonMethods/cobalt'
import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'

export default {
  title: 'Cobalt Delete - 002',
  description: 'Deletes content from invalid path and validates the result',
  plugin: [constants.youTubePlugin],
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, constants.youTubePlugin),
      () => pluginActivate.call(this, constants.youTubePlugin),
    ])
  },
  steps: [
    {
      description: 'Delete content from invalid path and validate the result',
      test() {
        return deleteFromDirectory.call(this, 'invalidPath')
      },
      validate(res) {
        if (res.code === 22 && res.message === 'ERROR_UNKNOWN_KEY') {
          return true
        } else {
          throw new Error('Error is is not as expected while deleting content from invalid path')
        }
      },
    },
  ],
}
