import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import { setWebKitUrl } from '../../commonMethods/webKitBrowser'
import { getMonitorInfo } from '../../commonMethods/monitor'
import constants from '../../commonMethods/constants'

let listener
export default {
  title: 'Webkit Memory test 001',
  description: 'Loads about blank and checks the memory usage',
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, 'WebKitBrowser'), //cycle the browser
      () => pluginDeactivate.call(this, 'UX'), //make sure UX is turned off
      () => pluginDeactivate.call(this, 'Netflix'), //make sure Netflix is turned off
      () => pluginDeactivate.call(this, 'Cobalt'), //make sure Cobalt is turned off
      () => pluginActivate.call(this, 'WebKitBrowser'),
      () => {
        return this.$thunder.api.call('WebKitBrowser', 'state', 'resumed')
      },
      () =>
        (listener = this.$thunder.api.WebKitBrowser.on('urlchange', data => {
          this.$data.write('currentUrl', data.url)
        })),
    ])
  },
  teardown() {
    listener.dispose()
  },
  context: {
    MAX_MEMORY: 85 * 1000 * 1000, //TODO - Need to update max memory
  },
  steps: [
    {
      description: 'Set WebKit URL to Blank',
      test: setWebKitUrl,
      params: constants.blankUrl,
      assert: constants.blankUrl,
    },
    {
      description: 'Sleep until URL is loaded',
      sleep() {
        // Purpose of this sleep is to wait until current step gets 'url change' response from the listener
        return new Promise((resolve, reject) => {
          const interval = setInterval(() => {
            if (this.$data.read('currentUrl') === constants.blankUrl) {
              clearInterval(interval)
              resolve()
            }
            reject('URL not loaded within time limit')
          }, 1000)
        })
      },
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
      if (plugin.observable === constants.webKitBrowserPlugin) {
        if (
          plugin !== undefined &&
          plugin.measurements !== undefined &&
          plugin.measurements.resident !== undefined &&
          plugin.measurements.resident.last !== undefined
        ) {
          if (plugin.measurements.resident.last < this.$context.read('MAX_MEMORY')) return true
          else {
            this.$log(
              `WebKitBrowser memory usage ${
                plugin.measurements.resident.last
              } is higher than ${this.$context.read('MAX_MEMORY')} while loading about:blank`
            )
            return false
          }
        } else {
          this.$log('Resident memory measurement not found in monitor response')
          return false
        }
      }
    }
    this.$log('Web kit browser Plugin not found')
    return false
  },
}
