import {
  getControllerPluginData,
  setWebKitUrl,
  webKitBrowserStartAndResume,
} from '../../commonMethods/commonFunctions'

let listener

export default {
  title: 'Thunder Load test',
  description: 'Stress tests the Thunder',
  repeat: {
    seconds: 1 * 60 * 60, //One hour
  },
  setup() {
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
      description: 'Check if Framework controller still responds',
      sleep: 15,
      test: getControllerPluginData,
      validate(result) {
        return this.$expect(result).to.be.object() === true
      },
    },
  ],
}
