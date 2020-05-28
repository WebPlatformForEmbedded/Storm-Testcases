import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import { getTraceControlStatus } from '../../commonMethods/traceControl'
import constants from '../../commonMethods/constants'

export default {
  title: 'Trace Control Status - 002',
  description: 'Get default Trace Control status and validate the result',
  steps: [
    {
      description: 'Check if Trace Control Plugin is stopped correctly',
      test: pluginDeactivate,
      params: constants.traceControlPlugin,
      assert: 'deactivated',
    },
    {
      description: 'Check if Trace Control Plugin is started correctly',
      test: pluginActivate,
      params: constants.traceControlPlugin,
      assert: 'activated',
    },
    {
      description: 'Invoke get traceControl Status and validate the result',
      test() {
        return getTraceControlStatus.call(this)
      },
      validate(res) {
        let response = res.settings
        for (let i = 0; i < response.length; i++) {
          let plugin = response[i]
          if (plugin.module !== null && plugin.category !== null && plugin.state !== null) {
            return true
          } else {
            this.$log('Mandatory info not in the plugin trace information')
            return false
          }
        }
      },
    },
  ],
}
