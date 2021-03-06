import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import { screenshot } from '../../commonMethods/commonFunctions'
import constants from '../../commonMethods/constants'
import { suspendOrResumeCobaltPlugin } from '../../commonMethods/cobalt'

let keysArray = ['up', 'down', 'left', 'right', 'ok']
let counter = 0
let curSameScreenshot = 0
let maxSameScreenshot = 5

export default {
  title: 'YouTube Random Key test - 001',
  description: 'Sends random keys to YouTube and checks if YouTube is still working',
  plugin: [
    constants.youTubePlugin,
    constants.snapshotPlugin,
    constants.webKitBrowserPlugin,
    constants.uxplugin,
  ],
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
      description: 'Repeat for 12 hours',
      sleepOnce: 20,
      repeat: {
        seconds: 12 * 60 * 60, // Twelve hours
      },
      steps: [
        {
          description: 'Press keys from Remote Control',
          repeat: 4,
          test() {
            let currCount = counter % 5
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
