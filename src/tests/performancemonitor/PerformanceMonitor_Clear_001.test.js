import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'
import { clearPerformanceData } from '../../commonMethods/performanceMonitor'

export default {
  title: 'Performance Monitor - Clear 001',
  description: 'Check whether performance data is cleared when we invoke Clear',
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, constants.performanceMonitor),
      () => pluginActivate.call(this, constants.performanceMonitor),
    ])
  },
  plugin: [constants.performanceMonitor],
  steps: [
    {
      description: 'Clear Performance data and validate the result',
      test() {
        return clearPerformanceData.call(this)
      },
      validate(res) {
        if (res === null) {
          return true
        } else {
          throw new Error('Performance data not cleared')
        }
      },
    },
  ],
}
