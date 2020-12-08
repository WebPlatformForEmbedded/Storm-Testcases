import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'
import { exchangeData } from '../../commonMethods/performanceMonitor'

export default {
  title: 'Performance Monitor - Exchange 001',
  description: 'Check whether performance monitor can exchange data',
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, constants.performanceMonitor),
      () => pluginActivate.call(this, constants.performanceMonitor),
    ])
  },
  plugin: [constants.performanceMonitor],
  steps: [
    {
      description: 'Exchange Performance data and validate the result',
      test() {
        return exchangeData.call(this, 'abababababab', 12)
      },
      validate(res) {
        if (res.data !== null && !isNaN(res.length)) {
          return true
        } else {
          throw new Error('Performance data not exchanged')
        }
      },
    },
  ],
}
