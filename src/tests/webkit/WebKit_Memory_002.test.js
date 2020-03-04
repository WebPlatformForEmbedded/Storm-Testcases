import {getMonitorInfo, pluginActivate} from '../../commonMethods/commonFunctions'
import constants from '../../commonMethods/constants'

export default {
  title: 'WPEWebkit Memory test 002',
  description: 'Loads youtube and checks the memory usage',
  context: {
    MAX_MEMORY: 85 * 1000 * 1000,
  },
  steps: [
    {
      description: 'Set WebKit URL to Youtube URL',
      test: pluginActivate,
      params: constants.youTubePlugin,
      assert: 'activated',
    },
    {
      description: 'Get Monitor Plugin Info',
      sleep: 10, //This sleep is to make sure that Monitor plugin is activated
      test() {
        return getMonitorInfo.call(this)
      },
      validate() {
        let monitorInfo = this.$data.read('monitorinfo')
        return this.$expect(monitorInfo).to.be.array() === true
      },
    },
  ],
  validate() {
    let response = this.$data.read('monitorinfo')
    for (let i = 0; i < response.length; i++) {
      let plugin = response[i]
      if (plugin.observable === constants.youTubePlugin) {
        if (
          plugin !== undefined &&
          plugin.measurements !== undefined &&
          plugin.measurements.resident !== undefined &&
          plugin.measurements.resident.last !== undefined
        ) {
          if (plugin.measurements.resident.last < this.$context.read('MAX_MEMORY')) return true
          else {
            this.$log(
              `Youtube Plugin memory usage ${
                plugin.measurements.resident.last
              } is higher than ${this.$context.read('MAX_MEMORY')} while loading Youtube`
            )
            return false
          }
        } else {
          this.$log('Resident memory measurement not found in monitor response')
          return false
        }
      }
    }
  },
}
