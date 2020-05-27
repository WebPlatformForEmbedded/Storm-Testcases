import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import { screenshot } from '../../commonMethods/commonFunctions'
import constants from '../../commonMethods/constants'
import { suspendOrResumeCobaltPlugin } from '../../commonMethods/cobalt'

let keysArray = ['up', 'down', 'left', 'right']
let counter = 0
let curSameScreenshot = 0
let maxSameScreenshot = 5

export default {
  title: 'YouTube Random Key test',
  description:
    'Send random keys to youtube, only to navigate the the UI. No enter is send so the device will never start playback',
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, 'WebKitBrowser'), //make sure the browser is turned off
      () => pluginDeactivate.call(this, 'UX'), //make sure UX is turned off
      () => pluginDeactivate.call(this, 'Netflix'), //make sure Netflix is turned off
      () => pluginDeactivate.call(this, 'Cobalt'), //make sure Cobalt is turned off
    ])
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
        suspendOrResumeCobaltPlugin.call(this, constants.resume)
      },
    },
    {
      description: 'Sleep for 10 seconds to make sure Youtube is loaded',
      sleep: 10,
    },
    {
      description: 'Repeat for 3 hours',
      repeat: {
        seconds: 3 * 60 * 60, // Three hours
      },
      steps: [
        {
          description: 'Press keys from Remote Control',
          repeat: 3,
          test() {
            let currCount = counter % 4
            counter++
            return this.$thunder.remoteControl.key(keysArray[currCount])
          },
          validate(res) {
            if (res === null) return true
            else {
              throw new Error(`Result is not as expected and is ${res}`)
            }
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
    },
  ],
}
