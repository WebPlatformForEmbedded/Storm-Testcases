import {
  getControllerPluginData,
  pluginActivate,
  pluginDeactivate,
} from '../../commonMethods/controller'
import { setWebKitUrl } from '../../commonMethods/webKitBrowser'

let listener

export default {
  title: 'Thunder Load test',
  description: 'Stress tests the Thunder',
  repeat: {
    seconds: 1 * 60 * 60, //One hour
  },
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, 'WebKitBrowser'), //make sure the browser is turned off
      () => pluginDeactivate.call(this, 'UX'), //make sure UX is turned off
      () => pluginDeactivate.call(this, 'Netflix'), //make sure Netflix is turned off
      () => pluginDeactivate.call(this, 'Cobalt'), //make sure Cobalt is turned off
      () => pluginActivate.call(this, 'WebKitBrowser'),
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
    listener.dispose()
  },
  steps: [
    {
      description: 'Navigating to Thunder UI',
      test() {
        let host = this.$thunder.api.options.host
        let url = `http://${host}/Service/Controller/UI?ip=&port=65535`
        this.$data.write('url', url)
        return setWebKitUrl.call(this, url)
      },
      validate(url) {
        return url === this.$data.read('url')
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
            if (this.$data.read('currentUrl') === this.$data.read('url')) {
              clearInterval(interval)
              this.$data.write('res', true)
              resolve()
            } else if (attempts > 10) {
              clearInterval(interval)
              reject('URL not loaded within time limit')
            }
          }, 1000)
        })
      },
      test() {
        if (this.$data.read('res') == true) {
          return true
        }
      },
      assert: true,
    },
    {
      description: 'Check if Framework controller still responds',
      sleep: 15,
      test: getControllerPluginData,
      validate(result) {
        return this.$expect(result).to.be.object() === true
      },
    },
  ],
}
