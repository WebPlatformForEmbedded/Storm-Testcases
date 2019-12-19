import { getPluginInfo } from '../../commonMethods/commonFunctions'
import constants from '../../commonMethods/constants'
import baseTest from './Framework_Monitor_001.test'
import { pluginActivate } from '../../commonMethods/commonFunctions'

export default {
  ...baseTest,
  ...{
    title: 'Framework Monitor test 002',
    description:
      'Tests if the Framework Monitor module return measurement values for WebKitBrowser',
    setup() {
      pluginActivate.call(this, constants.webKitBrowserPlugin)
    },
    steps: baseTest.steps.map((step, index) => {
      if (index === 2) {
        return {
          description: 'Get Monitor Plugin Info',
          sleep: 5, //This sleep is to make sure that Monitor plugin is activated
          test: getPluginInfo,
          params: constants.monitorPlugin,
          validate(result) {
            this.$data.write('pluginData', result)
            return this.$expect(result).to.be.object() === true
          },
        }
      }
      return step
    }),
    validate() {
      let response = this.$data.read('pluginData')
      if (response.data[0].measurment === undefined) {
        this.$log('Monitor measurement data is not present for WebKitBrowser')
        return false
      }
      return true
    },
  },
}
