import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import { screenshot } from '../../commonMethods/commonFunctions'
import constants from '../../commonMethods/constants'
import { setCobaltUrl, suspendOrResumeCobaltPlugin } from '../../commonMethods/cobalt'

let curSameScreenshot = 0
let maxSameScreenshot = 5

export default {
  title: 'YouTube Playback test - 017',
  description: 'Start playback of a VP9-1080p60Hz Asset and forward/backward outside the buffer',
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, 'WebKitBrowser'), //make sure the browser is turned off
      () => pluginDeactivate.call(this, 'UX'), //make sure UX is turned off
      () => pluginDeactivate.call(this, 'Netflix'), //make sure Netflix is turned off
      () => pluginDeactivate.call(this, 'Cobalt'), //make sure Cobalt is turned off
    ])
  },
  context: {
    url: 'https://www.youtube.com/tv#/watch/video/idle?v=tMMVhUbwK6Q&resume',
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
      description: 'Set Cobalt URL with the video URL which plays for 30 minutes',
      sleep: 20,
      test() {
        return setCobaltUrl.call(this, this.$context.read('url'))
      },
      //TODO - Implement validation for Cobalt URL
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
      description:
        'Check if Youtube is playing VP9-1080p60Hz Asset after forward/backward keys pressed outside the buffer',
      sleepOnce: 20,
      repeat: {
        seconds: 30 * 60, // 30 minutes
      },
      test() {
        this.$thunder.remoteControl.key('down')
        this.$thunder.remoteControl.key('down')
        this.$thunder.remoteControl.key('right')
        this.$thunder.remoteControl.key('left')
        return screenshot.call(this)
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
