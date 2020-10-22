import constants from '../../commonMethods/constants'
import baseTest from './Framework_Monitor_001.test'
import { pluginActivate } from '../../commonMethods/controller'
import { getMonitorInfo } from '../../commonMethods/monitor'

export default {
  ...baseTest,
  ...{
    title: 'Framework Monitor test 002',
    description:
      'Tests if the Framework Monitor module return measurement values for WebKitBrowser',
    plugin: [constants.monitorPlugin, constants.webKitBrowserPlugin],
    setup() {
      return this.$sequence([
        () => pluginActivate.call(this, 'WebKitBrowser'),
        () => {
          return this.$thunder.api.call('WebKitBrowser', 'state', 'resumed')
        },
      ])
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
        if (monitorData.observable === constants.webKitBrowserPlugin) {
          if (monitorData.measurements === undefined) {
            throw new Error('Monitor data measurement for WebKitBrowser is undefined')
          }
          return true
        }
      }
      throw new Error('Monitor data for WebKitBrowser plugin is unavailable')
    },
  },
}
