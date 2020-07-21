import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import { setWebKitUrl } from '../../commonMethods/webKitBrowser'
import constants from '../../commonMethods/constants'
import { AttachToLogs } from '../../commonMethods/remoteWebInspector'
import Moment from 'moment'

let logger
let count = 0
let initialTime
let finalTime

export default {
  title: 'Channel Change test - 002',
  description: 'Loads the Channel Change URL and runs for 12 hours',
  context: {
    url: 'http://cdn.metrological.com/static/storm/cc_time_v2.html?test_duration=720',
  },
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, 'WebKitBrowser'), //make sure the browser is turned off
      () => pluginDeactivate.call(this, 'UX'), //make sure UX is turned off
      () => pluginDeactivate.call(this, 'Netflix'), //make sure Netflix is turned off
      () => pluginDeactivate.call(this, 'Cobalt'), //make sure Cobalt is turned off
      () => pluginActivate.call(this, 'WebKitBrowser'),
      () => setWebKitUrl.call(this, 'about:blank'),
      () => {
        return this.$thunder.api.call('WebKitBrowser', 'state', 'resumed')
      },
    ])
  },
  teardown() {
    setWebKitUrl.call(this, constants.blankUrl)
  },
  steps: [
    {
      description: 'Change the channel continously for 12 hours and check the behavior',
      sleep: 5,
      test() {
        return new Promise((resolve, reject) => {
          let hostIP = this.$thunder.api.options.host
          function parseGoogleLogs(error, log) {
            console.log(log)
            const testStarted = /Tuning to channel/g
            const testsDone = /Test ended/g
            if (testStarted.test(log)) {
              count = count + 1
            }
            if (testsDone.test(log)) {
              resolve()
            }
          }
          console.log('Attaching to logs', hostIP)
          logger = new AttachToLogs(parseGoogleLogs, hostIP)
          logger.connect()
          setWebKitUrl.call(this, this.$context.read('url'))
          initialTime = Moment.utc()
        })
      },
    },
  ],
  validate() {
    finalTime = Moment.utc()
    let timeDiff = finalTime.diff(initialTime)
    if (timeDiff > 1200000) {
      return true
    } else {
      throw new Error('Channel change does not happened continously for 12 hours')
    }
  },
}
