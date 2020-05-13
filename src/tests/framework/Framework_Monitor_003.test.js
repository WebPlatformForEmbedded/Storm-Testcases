import { getMonitorInfo } from '../../commonMethods/monitor'
import { pluginActivate } from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'
import baseTest from './Framework_Monitor_001.test'

export default {
  ...baseTest,
  ...{
    title: 'Framework Monitor test 003',
    description: 'Tests if the Framework Monitor module returns measurement values for YouTube',
    setup() {
      pluginActivate.call(this, constants.youTubePlugin)
    },
    steps: baseTest.steps.map((step, index) => {
      if (index === 2) {
        return {
          description: 'Get Monitor Plugin Info',
          sleep: 5, //This sleep is to make sure that Monitor plugin is activated
          test() {
            return getMonitorInfo.call(this)
          },
          validate() {
            let monitorInfo = this.$data.read('monitorinfo')
            return this.$expect(monitorInfo).to.be.array() === true
          },
        }
      }
      return step
    }),
    validate() {
      let response = this.$data.read('monitorinfo')
      for (let i = 0; i < response.length; i++) {
        let monitorData = response[i]
        if (monitorData.observable === constants.youTubePlugin) {
          if (monitorData.measurements === undefined) {
            this.$log('Monitor data measurement for YouTube is undefined')
            return false
          }
          return true
        }
      }
      this.$log('Monitor data for Youtube plugin is unavailable')
      return false
    },
  },
}
