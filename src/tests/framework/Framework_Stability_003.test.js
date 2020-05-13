import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import { setWebKitUrl } from '../../commonMethods/webKitBrowser'

let listener
export default {
  title: 'Framework stability set URL test',
  description:
    'Stress loads the system by setting the URL in a loop and see if the Framework process continues to operate nominally',
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
  context: {
    //TODO - Update URL once the real URL is hosted on CDN
    url: 'http://cdn.metrological.com/static/eme-v3-clean.html',
  },
  steps: [
    {
      title: 'Repeat Steps for 100 times',
      description: 'Nested test to repeat the test for 100 times',
      repeat: 100,
      steps: [
        {
          description: 'Load URL',
          test() {
            return setWebKitUrl.call(this, this.$context.read('url'))
          },
          validate(res) {
            return res === this.$context.read('url')
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
          description: 'Sleep to check the Race car on monitor screen',
          sleep: 5,
        },
      ],
    },
  ],
}
