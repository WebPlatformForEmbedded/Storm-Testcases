import constants from '../../commonMethods/constants'
import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import { getMonitorInfo } from '../../commonMethods/monitor'

export default {
  title: 'Framework Monitor test 001',
  description: 'Tests if the Framework Monitor module works',
  plugin: [constants.monitorPlugin],
  setup() {
    this.$data.write('samples', [])
    return this.$sequence([
      () => pluginDeactivate.call(this, 'WebKitBrowser'), //make sure the browser is turned off
      () => pluginDeactivate.call(this, 'UX'), //make sure UX is turned off
      () => pluginDeactivate.call(this, 'Netflix'), //make sure Netflix is turned off
      () => pluginDeactivate.call(this, 'Cobalt'), //make sure Cobalt is turned off
      () => pluginActivate.call(this, 'WebKitBrowser'),
    ])
  },
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
    let pluginData = response.find(
      plugin => plugin.observable === constants.webKitBrowserPlugin || constants.youTubePlugin
    )
    if (pluginData.observable === constants.webKitBrowserPlugin || constants.youTubePlugin)
      return true
    else throw new Error('Monitor data is not present for WebKitBrowser and YouTube')
  },
}
