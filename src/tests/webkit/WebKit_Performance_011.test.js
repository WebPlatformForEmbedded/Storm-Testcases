import constants from '../../commonMethods/constants'
import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import { setWebKitUrl } from '../../commonMethods/webKitBrowser'

const URL = 'https://krakenbenchmark.mozilla.org/kraken-1.1/driver.html'
let listener

export default {
  title: 'WPEWebkit Kraken Benchmark test',
  description: 'Loads the Kraken Benchmark test and get the results',
  context: {
    resultURL: 'https://krakenbenchmark.mozilla.org/kraken-1.1/results.html',
  },
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
