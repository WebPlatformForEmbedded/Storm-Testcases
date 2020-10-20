import constants from '../../commonMethods/constants'
import { getPluginStatus } from '../../commonMethods/controller'

export default {
  title: 'Framework Controller Status - 002',
  description: 'Get status of multiple plugins',
  plugin: [constants.controllerPlugin, constants.webKitBrowserPlugin],
  steps: [
    {
      description: 'Get status of webkitbrowser plugin and validate the result',
      test() {
        return getPluginStatus.call(this, constants.webKitBrowserPlugin)
      },
      validate(res) {
        if (
          res.callsign !== null &&
          res.locator !== null &&
          res.classname !== null &&
          res.autostart !== null &&
          res.state !== null &&
          res.processedrequests !== null &&
          res.processedobjects !== null &&
          res.observers !== null &&
          res.module !== null &&
          res.hash !== null
        ) {
          return true
        } else {
          throw new Error('Mandatory elements in Plugin state not found')
        }
      },
    },
  ],
}
