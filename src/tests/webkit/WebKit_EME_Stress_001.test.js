import {
  setWebKitUrl,
  webKitBrowserStartAndResume,
  screenshot,
} from '../../commonMethods/commonFunctions'
import constants from '../../commonMethods/constants'

let listener
let curSameScreenshot = 0
let counter = 0
let maxSameScreenshot = 5

export default {
  title: 'Stress test using Race car test',
  description: 'Loads Race car test page and runs stress tests by playing a video for 3 hours',
  setup() {
    return this.$sequence([
      () => webKitBrowserStartAndResume.call(this),
      () =>
        (listener = this.$thunder.api.WebKitBrowser.on('urlchange', data => {
          this.$data.write('currentUrl', data.url)
        })),
    ])
  },
  context: {
    url: 'http://cdn.metrological.com/static/eme-v3-clean.html',
  },
  teardown() {
    setWebKitUrl.call(this, constants.blankUrl)
    listener.dispose()
  },
  steps: [
    {
      description: 'Navigating to EME URL',
      test() {
        this.$log(this.$context.read('url'))
        return setWebKitUrl.call(this, this.$context.read('url'))
      },
      validate(url) {
        return url === this.$context.read('url')
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
      description: 'Repeat for 3 hours',
      repeat: {
        seconds: 3 * 60 * 60, //Twelve hours
      },
      steps: [
        {
          description: 'Check if screen still updates',
          test: screenshot,
          validate() {
            let resp = this.$data.read('screenshotResult')
            if (resp !== undefined && resp.length > 0) {
              let prevScreenshot = this.$data.read('prevScreenshot')
              if (
                prevScreenshot === null ||
                (prevScreenshot !== null && prevScreenshot.equals(resp) === false)
              ) {
                this.$data.write('prevScreenshot', resp)
                curSameScreenshot = 0
                return true
              } else {
                if (curSameScreenshot >= maxSameScreenshot) {
                  this.$log(
                    'Screen is stuck, new screenshot is the same as previous screenshot for ' +
                      curSameScreenshot +
                      ' times.'
                  )
                  return false
                }
                curSameScreenshot++
                return true
              }
            } else {
              if (curSameScreenshot >= maxSameScreenshot) {
                this.$log('Error screenshot returned is empty for ' + curSameScreenshot + ' times.')
                return false
              }
              curSameScreenshot++
              return true
            }
          },
        },
      ],
    },
  ],
}
