import {
  setWebKitUrl,
  startHttpServer,
  matchIpRange,
  webKitBrowserOps,
  restartFramework,
  getPluginState,
  getCpuLoad,
  getPluginInfo,
} from '../commonMethods/commonFunctions'
import fs from 'fs'
import constants from '../commonMethods/constants'

let listener
let data

export default {
  title: 'WPEWebkit stability xmlhttprequest test',
  description:
    'Stress loads the system with xmlhttprequests and see if the WPEWebkit process continues to operate nominally',
  setup() {
    return this.$sequence([
      () => webKitBrowserOps.call(this),
      () =>
        (listener = this.$thunder.api.WebKitBrowser.on('urlchange', data => {
          this.$data.write('currentUrl', data.url)
        })),
      () => (
        (data = fs.readFileSync(
          './testcases/Storm-Testcases/src/resources/xmlhttprequest_app.html'
        )),
        this.$data.write('app', data)
      ),
    ])
  },
  teardown() {
    listener.dispose()
    restartFramework.call(this)
  },
  steps: [
    {
      description: 'Start http server',
      test: startHttpServer,
      validate() {
        let port = this.$data.read('port')
        if (port === null || port === undefined) return false
        return true
      },
    },
    {
      description: 'Determine IP to use',
      test: matchIpRange,
      validate(response) {
        if (response === undefined) return false
        this.$data.write('server', response)
        return true
      },
    },
    {
      description: 'Check whether Web Kit Browser Plugin is in resumed state',
      test: getPluginState,
      params: constants.webKitBrowserPlugin,
      assert: 'resumed',
    },
    {
      description: 'Load the app on WPEWebkit',
      test() {
        return setWebKitUrl.call(
          this,
          `http://${this.$data.read('server')}:${this.$data.read('port')}`
        )
      },
      validate(res) {
        return res === `http://${this.$data.read('server')}:${this.$data.read('port')}/`
      },
    },
    {
      description: 'Sleep until URL is loaded',
      sleep() {
        // Purpose of this sleep is to wait until current step gets 'url change' response from the listener
        return new Promise((resolve, reject) => {
          const interval = setInterval(() => {
            if (
              this.$data.read('currentUrl') ===
              `http://${this.$data.read('server')}:${this.$data.read('port')}/`
            ) {
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
        seconds: 1 * 60, //One hour
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
          test: getPluginInfo,
          params: constants.deviceInfo,
          validate(res) {
            this.$data.write('memoryUsage', res)
            return this.$expect(res).to.be.object() === true
          },
        },
        {
          description: 'Validate the Memory Usage',
          test() {
            let res = this.$data.read('memoryUsage')
            let resp = res.data
            let free, total
            if (resp.systeminfo === undefined) {
              this.$log('Cannot find systemInfo on DeviceInfo plugin response')
              return false
            } else {
              free = parseInt(resp.systeminfo.freeram)
              total = parseInt(resp.systeminfo.totalram)
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
