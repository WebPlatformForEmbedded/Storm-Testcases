import { pluginDeactivate, pluginActivate, screenshot } from '../../commonMethods/commonFunctions'
import constants from '../../commonMethods/constants'

let keysArray = ['left', 'up', 'ok']
let counter = 0
let curSameScreenshot = 0
let maxSameScreenshot = 5

export default {
  title: 'YouTube Playback test',
  description: 'Start playback of a movie on YouTube and let it run for 12 hours',
  context: {
    url: 'https://www.youtube.com/watch?v=kg3ElG-H7Wo', //12 hour length Youtube Video
  },
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
      description: 'Check if Youtube is started correctly',
      test() {
        return pluginActivate.call(this, constants.youTubePlugin)
      },
      validate(result) {
        if (result === 'resumed') {
          return true
        } else return false
      },
    },
    {
      description: 'Sleep for 10 seconds to make sure Youtube is loaded',
      sleep: 10,
    },
    {
      description: 'Press keys from Remote Control',
      repeat: 2,
      test() {
        let currCount = counter
        counter++
        return this.$thunder.remoteControl.key(keysArray[currCount])
      },
      validate(res) {
        if (res === null) return true
        else return false
      },
    },
    {
      description: 'Enter the URl for which the video need to be played',
      test() {
        return this.$thunder.remoteControl.key(this.$context.read('url'))
      },
      validate(res) {
        if (res === null) return true
        else return false
      },
    },
    {
      description: 'Press keys from Remote Control',
      repeat: 8,
      test() {
        let keyPressCount = ['down', 'down', 'down', 'down', 'down', 'right', 'right', 'ok', 'ok']
        let currCount = counter
        counter++
        return this.$thunder.remoteControl.key(keyPressCount[currCount])
      },
      validate(res) {
        if (res === null) return true
        else return false
      },
    },
    {
      description: 'Check if Youtube is playing for 12 hours',
      test: screenshot,
      repeat: {
        seconds: 12 * 60 * 60, // Twelve hours
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
}
