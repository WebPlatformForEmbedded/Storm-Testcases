import { setSshHost, checkIfProcessIsRunning } from '../../commonMethods/ssh.js'
import constants from '../../commonMethods/constants'

export default {
  title: 'Framework process check - 001',
  description: 'Check if Framework process is running',
  plugin: [constants.controllerPlugin],
  setup() {
    setSshHost(this.$thunder.api.options.host)
  },
  steps: [
    {
      description: 'Get the status of the framework main process',
      test() {
        return checkIfProcessIsRunning('WPEFramework')
      },
      validate(res) {
        if (res) {
          return true
        } else {
          throw new Error('WPEFramework process is not found.')
        }
      },
    },
  ],
}
