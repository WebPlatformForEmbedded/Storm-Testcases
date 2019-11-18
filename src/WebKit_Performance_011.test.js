import { setWebKitUrl, webKitBrowserOps } from './commonMethods/commonFunctions'
import constants from './commonMethods/constants'

const URL = 'http://peacekeeper.futuremark.com/run.action'
let listener

export default {
  title: 'WPEWebkit Peacekeeper Benchmark test',
  description: 'Loads the Peacekeeper Benchmark test and get the results',
  context: {
    resultURL: 'http://peacekeeper.futuremark.com/results',
  },
  setup() {
    return this.$sequence([
      () => webKitBrowserOps.call(this),
      () =>
        (listener = this.$thunder.api.WebKitBrowser.on('urlchange', data => {
          this.$data.write('currentUrl', data.url)
        })),
    ])
  },
  teardown() {
    setWebKitUrl.call(this, constants.blankUrl)
    listener.dispose()
  },
  steps: [
    {
      description: 'Navigating to Load http://peacekeeper.futuremark.com/run.action',
      test: setWebKitUrl,
      params: URL,
      assert: URL,
    },
    {
      description: 'Sleep until URL is loaded',
      sleep() {
        // Purpose of this sleep is to wait until current step gets 'url change' response from the listener
        return new Promise((resolve, reject) => {
          let attempts = 0
          const interval = setInterval(() => {
            attempts++
            if (this.$data.read('currentUrl') === URL) {
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
      description: 'Validate the test by verifying if the url is still loaded',
      sleep() {
        // Purpose of this sleep is to wait until current step gets 'url change' response from the listener
        return new Promise((resolve, reject) => {
          const interval = setInterval(() => {
            if (this.$data.read('currentUrl') === this.$context.read('resultURL')) {
              clearInterval(interval)
              resolve()
            }
            reject('URL not loaded within time limit')
          }, 480000)
        })
      },
      test() {
        this.$thunder.api.WebKitBrowser.url().then(url => {
          let PeacekeeperUrl = url.split('?')
          this.$data.write('result', PeacekeeperUrl[0])
        })
      },
    },
  ],
  validate() {
    let result = this.$data.read('result')
    if (result === this.$context.read('resultURL')) return true
    else return false
  },
}
