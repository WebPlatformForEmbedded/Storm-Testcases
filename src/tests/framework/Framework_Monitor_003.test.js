import { getPluginInfo, pluginActivate } from '../../commonMethods/commonFunctions'
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
      if (response.data[1].measurment === undefined) {
        this.$log('Monitor measurement data is not present for Youtube')
        return false
      }
      return true
    },
  },
}
