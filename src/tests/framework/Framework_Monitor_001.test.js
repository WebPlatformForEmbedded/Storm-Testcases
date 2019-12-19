import {
  getPluginInfo,
  pluginDeactivate,
  pluginActivate,
} from '../../commonMethods/commonFunctions'
import constants from '../../commonMethods/constants'

export default {
  title: 'Framework Monitor test 001',
  description: 'Tests if the Framework Monitor module works',
  steps: [
    {
      description: 'Deactivating Monitor Plugin and checking whether deactivated or not',
      test: pluginDeactivate,
      params: constants.monitorPlugin,
      assert: 'deactivated',
    },
    {
      description: 'Activating Monitor Plugin and checking whether activated or not',
      test: pluginActivate,
      params: constants.monitorPlugin,
      assert: 'activated',
    },
    {
      description: 'Get Monitor Plugin Info',
      sleep: 5, //This sleep is to make sure that Monitor plugin is activated
      test: getPluginInfo,
      params: constants.monitorPlugin,
      validate(result) {
        this.$data.write('pluginData', result)
        return this.$expect(result).to.be.object() === true
      },
    },
  ],
  validate() {
    let response = this.$data.read('pluginData')
    for (let i = 0; i < response.data.length; i++) {
      let plugin = response.data[i]
      if (
        plugin.name === constants.webKitBrowserPlugin ||
        plugin.name === constants.youTubePlugin
      ) {
        return true
      } else {
        this.$log('Monitor data is not present for WebKitBrowser and YouTube')
        return false
      }
    }
  },
}
