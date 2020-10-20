import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import { screenshot } from '../../commonMethods/commonFunctions'
import constants from '../../commonMethods/constants'
import { setCobaltUrl, suspendOrResumeCobaltPlugin } from '../../commonMethods/cobalt'

let curSameScreenshot = 0
let maxSameScreenshot = 5

export default {
  title: 'YouTube Playback test - 002',
  description: 'Start playback of a movie on YouTube and let it run for 8 hours',
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, 'WebKitBrowser'), //make sure the browser is turned off
      () => pluginDeactivate.call(this, 'UX'), //make sure UX is turned off
      () => pluginDeactivate.call(this, 'Netflix'), //make sure Netflix is turned off
      () => pluginDeactivate.call(this, 'Cobalt'), //make sure Cobalt is turned off
    ])
  },
  teardown() {
    setCobaltUrl.call(this, 'https://www.youtube.com/tv')
  },
  steps: [
    {
      description: 'Activate Youtube Plugin and check suspended or not',
      test: pluginActivate,
      params: constants.youTubePlugin,
      assert: 'suspended',
    },
    {
      description: 'Resume Cobalt Plugin and check resumed or not',
      test() {
        return suspendOrResumeCobaltPlugin.call(this, constants.resume)
      },
      validate(res) {
        if (res === null) {
          return true
        } else {
          throw new Error('Youtube not resumed')
        }
      },
    },
    {
      description: 'Press Ok to continue playing video',
      sleep: 20,
      test() {
        return this.$thunder.remoteControl.key('ok')
      },
      validate(res) {
        if (res === null) {
          return true
        } else {
          throw new Error('Ok button not pressed')
        }
      },
    },
    {
      description: 'Set Cobalt URL with the video URL which plays for 8 hours',
      sleep: 20,
      test() {
        return setCobaltUrl.call(this, constants.youtubeLongMovieUrl)
      },
      //TODO - Implement validation for Cobalt URL
    },
    {
      description: 'Check if Youtube is playing for 8 hours',
      sleep: 20,
      test: screenshot,
      repeat: {
        seconds: 8 * 60 * 60, // Eight hours
      },
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
              throw new Error(
                'Screen is stuck, new screenshot is the same as previous screenshot for ' +
                  curSameScreenshot +
                  ' times.'
              )
            }
            curSameScreenshot++
            return true
          }
        } else {
          if (curSameScreenshot >= maxSameScreenshot) {
            throw new Error(
              'Error screenshot returned is empty for ' + curSameScreenshot + ' times.'
            )
          }
          curSameScreenshot++
          return true
        }
      },
    },
  ],
}
