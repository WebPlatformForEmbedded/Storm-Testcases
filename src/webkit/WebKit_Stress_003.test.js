import baseTest from './WebKit_Stress_001.test'
import { setWebKitUrl, webKitBrowserOps, restartFramework } from '../commonMethods/commonFunctions'
import fs from 'fs'
const url = require('url')

let listener
let data
export default {
  ...baseTest,
  ...{
    title: 'WPEWebkit stability redirect test',
    description:
      'Stress loads the system with redirects and see if the WPEWebkit process continues to operate nominally',
    setup() {
      return this.$sequence([
        () => webKitBrowserOps.call(this),
        () =>
          (listener = this.$thunder.api.WebKitBrowser.on('urlchange', data => {
            this.$data.write('currentUrl', data.url)
          })),
        () => (
          (data = fs.readFileSync('./testcases/Storm-Testcases/src/resources/redir_app.html')),
          this.$data.write('app', data)
        ),
      ])
    },
    teardown() {
      listener.dispose()
      restartFramework.call(this)
    },
    steps: baseTest.steps.map((step, index) => {
      if (index === 3) {
        return {
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
        }
      }
      if (index === 4) {
        return {
          description: 'Sleep until URL is loaded',
          sleep() {
            // Purpose of this sleep is to wait until current step gets 'url change' response from the listener
            return new Promise((resolve, reject) => {
              const interval = setInterval(() => {
                let currentUrl = this.$data.read('currentUrl')
                var parsedUrl = url.parse(currentUrl)
                if (parsedUrl.host === `${this.$data.read('server')}:${this.$data.read('port')}`) {
                  clearInterval(interval)
                  resolve()
                }
                reject('URL not loaded within time limit')
              }, 1000)
            })
          },
        }
      }
      return step
    }),
  },
}
