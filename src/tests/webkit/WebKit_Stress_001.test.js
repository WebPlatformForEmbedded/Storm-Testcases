import constants from '../../commonMethods/constants'
import { getPluginState, pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import { setWebKitUrl } from '../../commonMethods/webKitBrowser'
import { getCpuLoad, getDeviceInfo } from '../../commonMethods/deviceInfo'

let listener

export default {
  title: 'WPEWebkit stability xmlhttprequest test',
  description:
    'Stress loads the system with xmlhttprequests and see if the WPEWebkit process continues to operate nominally',
  plugin: [constants.webKitBrowserPlugin, constants.youTubePlugin, constants.uxplugin],
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, 'WebKitBrowser'), //cycle the browser
      () => pluginDeactivate.call(this, 'UX'), //make sure UX is turned off
      () => pluginDeactivate.call(this, 'Netflix'), //make sure Netflix is turned off
      () => pluginDeactivate.call(this, 'Cobalt'), //make sure Cobalt is turned off
      () => pluginActivate.call(this, 'WebKitBrowser'),
      () => setWebKitUrl.call(this, 'about:blank'),
      () => {
        return this.$thunder.api.call('WebKitBrowser', 'state', 'resumed')
      },
      () => {
        listener = this.$thunder.api.WebKitBrowser.on(
          'urlchange',
          data => {
            this.$log('Got urlchange event: ', data.url)
            this.$data.write('currentUrl', data.url)
          },
          e => {
            this.$log('Error subscribing to urlchange: ', e)
          }
        )
        return true
      },
    ])
  },
  context: {
    url: 'https://cdn.metrological.com/static/testbot/v1/xmlhttprequest_app.html',
  },
  teardown() {
    listener.dispose()
  },
  steps: [
    {
      description: 'Check whether Web Kit Browser Plugin is in resumed state',
      test: getPluginState,
      params: constants.webKitBrowserPlugin,
      assert: 'resumed',
    },
    {
      description: 'Load the app on WPEWebkit',
      test() {
        this.$log(this.$context.read('url'))
        return setWebKitUrl.call(this, this.$context.read('url'))
      },
      validate(url) {
        return url === this.$context.read('url')
      },
    },
    {
      description: 'Sleep until URL is loaded',
      sleep() {
        // Purpose of this sleep is to wait until current step gets 'url change' response from the listener
        return new Promise((resolve, reject) => {
          const interval = setInterval(() => {
            if (this.$data.read('currentUrl') === this.$context.read('url')) {
              clearInterval(interval)
              resolve()
            }
            reject('URL not loaded within time limit')
          }, 1000)
        })
      },
    },
    {
      title: 'Repeat the steps for 1 hour',
      description: 'Nested test to repeat the test for 1 hour',
      repeat: {
        seconds: 1 * 60 * 60, //One hour
      },
      steps: [
        {
          description: 'Get CPU load',
          test: getCpuLoad,
          params: constants.deviceInfo,
          validate() {
            let cpuload = this.$data.read('cpuload')
            if (cpuload > 90) {
              throw new Error('CPU load is greater than 90')
            } else {
              return true
            }
          },
        },
        {
          description: 'Get Memory Usage and check the response',
          test() {
            return getDeviceInfo.call(this)
          },
          validate() {
            let result = this.$data.read('systeminfo')
            return this.$expect(result).to.be.object() === true
          },
        },
        {
          description: 'Validate the Memory Usage',
          test() {
            let resp = this.$data.read('systeminfo')
            let free, total
            if (resp === undefined) {
              throw new Error('Cannot find systemInfo on DeviceInfo plugin response')
            } else {
              free = parseInt(resp.freeram)
              total = parseInt(resp.totalram)
              let memUsage = Math.round((free / total) * 100)
              this.$data.write('memoryUsageValue', memUsage)
            }
          },
          validate() {
            let memUsage = this.$data.read('memoryUsageValue')
            if (memUsage < 98) return true
            else {
              throw new Error('Memory usage is above 98%, failing test')
            }
          },
        },
      ],
    },
  ],
}
