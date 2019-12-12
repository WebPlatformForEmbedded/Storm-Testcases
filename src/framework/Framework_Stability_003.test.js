import {
  setWebKitUrl,
  startHttpServer,
  matchIpRange,
  webKitBrowserStartAndResume,
} from '../commonMethods/commonFunctions'

let listener

export default {
  title: 'Framework stability set URL test',
  description:
    'Stress loads the system by setting the URL in a loop and see if the Framework process continues to operate nominally',
  setup() {
    return this.$sequence([
      () => webKitBrowserStartAndResume.call(this),
      () =>
        (listener = this.$thunder.api.WebKitBrowser.on('urlchange', data => {
          this.$data.write('currentUrl', data.url)
        })),
      () => this.$data.write('app', this.$context.read('html')),
    ])
  },
  context: {
    html:
      '<html><head><title>Hello! This is a set url test</title></head><body><p style="position: absolute; left: 150px; top: 150px">Framework Set URL test</p><script>console.log("Page loaded succesfully")</script></body></html>',
  },
  steps: [
    {
      description: 'Start HTTP server1, serve the app',
      test() {
        this.$data.write('appLoaded1', true)
        startHttpServer.call(this)
      },
      validate() {
        let port = this.$data.read('port')
        if (port === null || port === undefined) return false
        this.$data.write('server1', port)
        return true
      },
    },
    {
      description: 'Start HTTP server2, serve the app',
      test() {
        this.$data.write('appLoaded2', true)
        startHttpServer.call(this)
      },
      validate() {
        let port = this.$data.read('port')
        if (port === null || port === undefined) return false
        this.$data.write('server2', port)
        return true
      },
    },
    {
      description: 'Start HTTP server3, serve the app',
      test() {
        this.$data.write('appLoaded3', true)
        startHttpServer.call(this)
      },
      validate() {
        let port = this.$data.read('port')
        if (port === null || port === undefined) return false
        this.$data.write('server3', port)
        return true
      },
    },
    {
      description: 'Determine IP to use',
      test: matchIpRange,
      validate(response) {
        if (response === undefined) return false
        this.$data.write('ip', response)
        return true
      },
    },
    {
      description: 'Form 3 differnt URLs',
      test() {
        this.$data.write('url1', `http://${this.$data.read('ip')}:${this.$data.read('server1')}/`)
        this.$data.write('url2', `http://${this.$data.read('ip')}:${this.$data.read('server2')}/`)
        this.$data.write('url3', `http://${this.$data.read('ip')}:${this.$data.read('server3')}/`)
      },
    },
    {
      description: 'Load URL1',
      test() {
        return setWebKitUrl.call(this, this.$data.read('url1'))
      },
      validate(res) {
        return res === this.$data.read('url1')
      },
    },
    {
      description: 'Sleep until URL1 is loaded and load URL2',
      sleep() {
        // Purpose of this sleep is to wait until current step gets 'url change' response from the listener
        return new Promise((resolve, reject) => {
          const interval = setInterval(() => {
            if (this.$data.read('currentUrl') === this.$data.read('url1')) {
              clearInterval(interval)
              resolve()
            }
            reject('URL not loaded within time limit')
          }, 1000)
        })
      },
      test() {
        return setWebKitUrl.call(this, this.$data.read('url2'))
      },
      validate(res) {
        return res === this.$data.read('url2')
      },
    },
    {
      description: 'Sleep until URL2 is loaded and load URL3',
      sleep() {
        // Purpose of this sleep is to wait until current step gets 'url change' response from the listener
        return new Promise((resolve, reject) => {
          const interval = setInterval(() => {
            if (this.$data.read('currentUrl') === this.$data.read('url2')) {
              clearInterval(interval)
              resolve()
            }
            reject('URL not loaded within time limit')
          }, 1000)
        })
      },
      test() {
        return setWebKitUrl.call(this, this.$data.read('url3'))
      },
      validate(res) {
        return res === this.$data.read('url3')
      },
    },
    {
      description: 'Sleep until URL3 is loaded',
      sleep() {
        // Purpose of this sleep is to wait until current step gets 'url change' response from the listener
        return new Promise((resolve, reject) => {
          const interval = setInterval(() => {
            if (this.$data.read('currentUrl') === this.$data.read('url3')) {
              clearInterval(interval)
              resolve()
            }
            reject('URL not loaded within time limit')
          }, 1000)
        })
      },
    },
  ],
}
