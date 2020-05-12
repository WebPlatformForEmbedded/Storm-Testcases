import {
  setWebKitUrl,
  webKitBrowserStartAndResume,
  getPluginState,
  getCpuLoad,
  getDeviceInfo,
} from '../../commonMethods/commonFunctions'
import constants from '../../commonMethods/constants'

let listener

export default {
  title: 'WPEWebkit stability redirect test',
  description:
    'Stress loads the system with redirects and see if the WPEWebkit process continues to operate nominally',
  setup() {
    return this.$sequence([
      () => webKitBrowserStartAndResume.call(this),
      () =>
        (listener = this.$thunder.api.WebKitBrowser.on('urlchange', data => {
          this.$data.write('currentUrl', data.url)
        })),
    ])
  },
  context: {
    url: 'http://cdn.metrological.com/static/storm/app_redirect1.html',
    expUrl1:
      'http://cdn.metrological.com/static/storm/app_redirect2.html?run=1&runs=-1&wait=200&requests=20&side=A',
    expUrl2:
      'http://cdn.metrological.com/static/storm/app_redirect1.html?run=1&runs=-1&wait=200&requests=20&side=B',
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
          let attempts = 0
          const interval = setInterval(() => {
            attempts++
            if (
              this.$data.read('currentUrl') === this.$context.read('expUrl1') ||
              this.$context.read('expUrl2')
            ) {
              clearInterval(interval)
              resolve()
            } else if (attempts > 10) {
              clearInterval(interval)
              reject('URL not loaded within time limit')
            }
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
              this.$log('CPU load is greater than 90')
              return false
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
              this.$log('Cannot find systemInfo on DeviceInfo plugin response')
              return false
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
              this.$log('Memory usage is above 98%, failing test')
              return false
            }
          },
        },
      ],
    },
  ],
}
