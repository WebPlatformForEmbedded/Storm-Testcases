import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import { getTraceControlStatus, setTraceForModule } from '../../commonMethods/traceControl'
import constants from '../../commonMethods/constants'

export default {
  title: 'Trace Control - 001',
  description:
    'Set the Trace of Plugin with state as enabled and check whether the state is set or not',
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, constants.traceControlPlugin),
      () => pluginActivate.call(this, constants.traceControlPlugin),
    ])
  },
  context: {
    module: 'Plugin_Monitor',
    category: 'Information',
    state: 'enabled',
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
      description: 'Get status and check whether the state is set or not',
      test() {
        return getTraceControlStatus.call(
          this,
          this.$context.read('module'),
          this.$context.read('category')
        )
      },
      validate(res) {
        let setting = res.settings[0]
        if (setting.state === this.$context.read('state')) {
          return true
        } else {
          throw new Error('State not set for the Plugin ')
        }
      },
    },
  ],
}
