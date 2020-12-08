import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'
import { sendData } from '../../commonMethods/performanceMonitor'

export default {
  title: 'Performance Monitor - Send 001',
  description: 'Check whether performance monitor can send data',
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, constants.performanceMonitor),
      () => pluginActivate.call(this, constants.performanceMonitor),
    ])
  },
  plugin: [constants.performanceMonitor],
  steps: [
    {
      description: 'Sends Performance data and validate the result',
      test() {
        return sendData.call(this, 'abababababab', 12)
      },
      validate(res) {
        if (res !== null && !isNaN(res)) {
          return true
        } else {
          throw new Error('Performance data not sent')
        }
      },
    },
  ],
}
