import {
  setWebKitUrl,
  webKitBrowserStartAndResume,
  getPluginInfo,
} from '../commonMethods/commonFunctions'
import constants from '../commonMethods/constants'

let listener
let URL = 'https://www.youtube.com/tv'

export default {
  title: 'WPEWebkit Memory test 002',
  description: 'Loads youtube and checks the memory usage',
  setup() {
    this.$data.write('samples', [])
    return this.$sequence([
      () => webKitBrowserStartAndResume.call(this),
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
    MAX_MEMORY: 85 * 1000 * 1000,
  },
  steps: [
    {
      description: 'Set WebKit URL to Youtube URL',
      test: setWebKitUrl,
      params: URL,
      assert: URL,
    },
    {
      description: 'Validate the test by verifying if the url is still loaded',
      sleep() {
        // Purpose of this sleep is to wait until current step gets 'url change' response from the listener
        return new Promise((resolve, reject) => {
          const interval = setInterval(() => {
            if (this.$data.read('currentUrl') === URL) {
              this.$log(this.$data.read('currentUrl'))
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
      if (plugin.name === constants.webKitBrowserPlugin) {
        if (
          plugin !== undefined &&
          plugin.measurment !== undefined &&
          plugin.measurment.resident !== undefined &&
          plugin.measurment.resident.last !== undefined
        ) {
          if (plugin.measurment.resident.last < this.$context.read('MAX_MEMORY')) return true
          else {
            this.$log(
              `WebKitBrowser memory usage ${
                plugin.measurment.resident.last
              } is higher then ${this.$context.read('MAX_MEMORY')} while loading about:blank`
            )
            return false
          }
        } else {
          this.$log('Resident memory measurement not found in monitor response')
          return false
        }
      }
    }
  },
}
