import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import { getTraceControlStatus, setTraceForModule } from '../../commonMethods/traceControl'
import constants from '../../commonMethods/constants'

export default {
  title: 'Trace Control Status - 001',
  description: 'Checks the functionality of setting the Trace for a module and getting the status',
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, constants.traceControlPlugin),
      () => pluginActivate.call(this, constants.traceControlPlugin),
    ])
  },
  context: {
    module: 'Plugin_Monitor',
    category: 'Information',
    state: 'disabled',
  },
  steps: [
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
          throw new Error('Error in setting trace for a module')
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
          setting.module === this.$context.read('module') &&
          setting.category === this.$context.read('category') &&
          setting.state === this.$context.read('state')
        ) {
          return true
        } else {
          throw new Error('Error in getting traceControl Status')
        }
      },
    },
  ],
}
