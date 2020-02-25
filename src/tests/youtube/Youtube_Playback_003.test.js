import {
  pluginDeactivate,
  pluginActivate,
  screenshot,
  youtubeStartAndResume,
  getYoutubeUrl,
} from '../../commonMethods/commonFunctions'
import constants from '../../commonMethods/constants'

let curSameScreenshot = 0
let maxSameScreenshot = 5
let listener

export default {
  title: 'YouTube Playback test',
  description: 'Start playback of a movie on YouTube and let it run for 30 minutes',
  setup() {
    return this.$sequence([
      () => youtubeStartAndResume.call(this),
      () =>
        (listener = this.$thunder.api.Cobalt.on('urlchange', data => {
          this.$data.write('currentUrl', data.url)
        })),
    ])
  },
  teardown() {
    listener.dispose()
  },
  context: {
    url: 'https://www.youtube.com/watch?v=G0YwEc50dZg', //30 minute length Youtube Video
  },
  steps: [
    {
      description: 'Check if WPEWebkit is stopped correctly',
      test: pluginDeactivate,
      params: constants.webKitBrowserPlugin,
      assert: 'deactivated',
    },
    {
      description: 'Check if Youtube is stopped correctly',
      test: pluginDeactivate,
      params: constants.youTubePlugin,
      assert: 'deactivated',
    },
    {
      description: 'Check if Youtube is started correctly',
      test() {
        return pluginActivate.call(this, constants.youTubePlugin)
      },
      validate(result) {
        if (result === 'suspended') {
          return true
        } else return false
      },
    },
    {
      description: 'Navigating to Youtube URL which plays for 30 minutes',
      test() {
        this.$log(this.$context.read('url'))
        return getYoutubeUrl.call(this, this.$context.read('url'))
      },
      validate(url) {
        return url === this.$context.read('url')
      },
    },
    {
      description: 'Validate the test by verifying if the url is still loaded',
      sleep() {
        // Purpose of this sleep is to wait until current step gets 'url change' response from the listener
        return new Promise((resolve, reject) => {
          const interval = setInterval(() => {
            if (this.$data.read('currentUrl') === this.$context.read('url')) {
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
      description: 'Repeat for 30 hours',
      repeat: {
        seconds: 30 * 60, // 30 minutes
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
