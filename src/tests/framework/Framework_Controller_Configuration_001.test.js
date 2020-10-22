import { getPluginConfiguration } from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'

export default {
  title: 'Framework Controller Configuration - 001',
  description: 'Validate Plugin Configuration',
  plugin: [constants.controllerPlugin, constants.webKitBrowserPlugin],
  steps: [
    {
      description: 'Get Plugin Configuration and validate the result',
      test() {
        return getPluginConfiguration.call(this, constants.webKitBrowserPlugin)
      },
      validate(res) {
        if (res !== undefined && res !== null) {
          return true
        } else {
          throw new Error('Configuration not available')
        }
      },
    },
  ],
}
