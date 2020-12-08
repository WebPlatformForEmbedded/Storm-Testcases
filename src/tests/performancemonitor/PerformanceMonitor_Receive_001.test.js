import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'
import { receiveData } from '../../commonMethods/performanceMonitor'

export default {
  title: 'Performance Monitor - Receive 001',
  description: 'Check whether performance monitor can receive data',
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, constants.performanceMonitor),
      () => pluginActivate.call(this, constants.performanceMonitor),
    ])
  },
  plugin: [constants.performanceMonitor],
  steps: [
    {
      description: 'Receives Performance data and validate the result',
      test() {
        return receiveData.call(this, 9)
      },
      validate(res) {
        if (res.data !== null && !isNaN(res.length)) {
          return true
        } else {
          throw new Error('Performance data not received')
        }
      },
    },
  ],
}
