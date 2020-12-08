import constants from '../../commonMethods/constants'
import { deleteFromDirectory } from '../../commonMethods/cobalt'
import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'

export default {
  title: 'Cobalt Delete - 001',
  description: 'Deletes content from path and validate the result',
  plugin: [constants.youTubePlugin],
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, constants.youTubePlugin),
      () => pluginActivate.call(this, constants.youTubePlugin),
    ])
  },
  steps: [
    {
      description: 'Delete content from path and validate the result',
      test() {
        return deleteFromDirectory.call(this, '.cache/Cobalt/cobalt/')
      },
      validate(res) {
        if (res === null) {
          return true
        } else {
          throw new Error('Content is not deleted from the path')
        }
      },
    },
  ],
}
