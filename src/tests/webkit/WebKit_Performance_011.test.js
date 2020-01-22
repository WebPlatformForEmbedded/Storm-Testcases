import { setWebKitUrl, webKitBrowserActions } from '../../commonMethods/commonFunctions'
import constants from '../../commonMethods/constants'

const URL = 'https://krakenbenchmark.mozilla.org/kraken-1.1/driver.html'
let listener

export default {
  title: 'WPEWebkit Kraken Benchmark test',
  description: 'Loads the Kraken Benchmark test and get the results',
  context: {
    resultURL: 'https://krakenbenchmark.mozilla.org/kraken-1.1/results.html',
  },
  setup() {
    return this.$sequence([
      () => webKitBrowserActions.call(this),
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
      description: 'Navigating to Load Kranken Bench Mark URL',
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
            let url = this.$data.read('currentUrl')
            let krakenBenchmarkUrl = url.split('?')
            if (krakenBenchmarkUrl[0] === this.$context.read('resultURL')) {
              clearInterval(interval)
              resolve()
            }
            reject('URL not loaded within time limit')
          }, 480000)
        })
      },
    },
  ],
}
