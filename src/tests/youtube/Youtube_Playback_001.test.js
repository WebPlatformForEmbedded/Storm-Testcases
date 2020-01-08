import { pluginDeactivate, pluginActivate, screenshot } from '../../commonMethods/commonFunctions'
import constants from '../../commonMethods/constants'

let curSameScreenshot = 0
let maxSameScreenshot = 5

export default {
  title: 'YouTube Playback test',
  description: 'Start playback of a movie on YouTube and let it run for 12 hours',
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
      description: 'Repeat for 12 hours',
      repeat: {
        seconds: 12 * 60 * 60, //Twelve hours
      },
      steps: [
        {
          description: 'Press Enter key from Remote Control',
          test() {
            return this.$thunder.remoteControl.enter()
          },
          validate(res) {
            if (res === null) return true
            else return false
          },
        },
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
