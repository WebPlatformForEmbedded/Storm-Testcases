import { getPluginsStatus } from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'

export default {
  title: 'Framework Controller Status - 003',
  description: 'Get status of multiple plugins plugin',
  plugin: [constants.controllerPlugin],
  steps: [
    {
      description: 'Get status of multiple plugins   and validate the result',
      test() {
        return getPluginsStatus.call(this)
      },
      validate(res) {
        this.$log('res is', res.length)
        for (let i = 0; i < res.length; i++) {
          let plugin = res[i]
          if (
            plugin.callsign !== null &&
            plugin.locator !== null &&
            plugin.classname !== null &&
            plugin.autostart !== null &&
            plugin.state !== null &&
            plugin.processedrequests !== null &&
            plugin.processedobjects !== null &&
            plugin.observers !== null &&
            plugin.module !== null &&
            plugin.hash !== null
          ) {
            if (i === res.length - 1) {
              return true
            }
          } else {
            throw new Error('Mandatory elements in Plugins state not found')
          }
        }
      },
    },
  ],
}
