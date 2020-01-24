import {
  pluginDeactivate,
  pluginActivate,
  getMonitorInfo,
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
      if (
        plugin.observable === constants.webKitBrowserPlugin ||
        plugin.observable === constants.youTubePlugin
      ) {
        return true
      } else {
        this.$log('Monitor data is not present for WebKitBrowser and YouTube')
        return false
      }
    }
  },
}
