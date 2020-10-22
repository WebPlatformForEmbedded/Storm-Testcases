import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import { getTraceControlStatus } from '../../commonMethods/traceControl'
import constants from '../../commonMethods/constants'

export default {
  title: 'Trace Control Status - 002',
  description: 'Get default Trace Control status and validate the result',
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, constants.traceControlPlugin),
      () => pluginActivate.call(this, constants.traceControlPlugin),
    ])
  },
  plugin: [constants.traceControlPlugin],
  steps: [
    {
      description: 'Invoke get traceControl Status and validate the result',
      test() {
        return getTraceControlStatus.call(this)
      },
      validate(res) {
        let response = res.settings
        for (let i = 0; i < response.length; i++) {
          let plugin = response[i]
          if (plugin != null) {
            if (plugin.module !== null && plugin.category !== null && plugin.state !== null) {
              return true
            } else {
              throw new Error('Mandatory info not in the plugin trace information')
            }
          }
        }
      },
    },
  ],
}
