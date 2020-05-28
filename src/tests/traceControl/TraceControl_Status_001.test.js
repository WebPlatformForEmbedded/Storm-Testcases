import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import { getTraceControlStatus, setTraceForModule } from '../../commonMethods/traceControl'
import constants from '../../commonMethods/constants'

export default {
  title: 'Trace Control Status - 001',
  description: 'Checks the functionality of setting the Trace for a module and getting the status',
  context: {
    module: 'Plugin_Monitor',
    category: 'Information',
    state: 'disabled',
  },
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
      description: 'Set Trace for a module and validate the result',
      test() {
        return setTraceForModule.call(
          this,
          this.$context.read('module'),
          this.$context.read('category'),
          this.$context.read('state')
        )
      },
      validate(res) {
        if (res == null) {
          return true
        } else {
          this.$log('Error in seting trace for a module')
          return false
        }
      },
    },
    {
      description: 'Invoke get traceControl Status',
      test() {
        return getTraceControlStatus.call(
          this,
          this.$context.read('module'),
          this.$context.read('category')
        )
      },
      validate(res) {
        let setting = res.settings[0]
        if (
          res.console != null &&
          res.remote.port != null &&
          res.remote.binding != null &&
          setting.module === this.$context.read('module') &&
          setting.category === this.$context.read('category') &&
          setting.state === this.$context.read('state')
        ) {
          return true
        } else {
          this.$log('Error in getting traceControl Status')
          return false
        }
      },
    },
  ],
}
