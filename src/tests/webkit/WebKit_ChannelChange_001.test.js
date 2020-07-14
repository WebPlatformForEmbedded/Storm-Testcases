import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import { setWebKitUrl } from '../../commonMethods/webKitBrowser'
import constants from '../../commonMethods/constants'
import { AttachToLogs } from '../../commonMethods/remoteWebInspector'

let url = 'http://cdn.metrological.com/static/storm/cc_time_v2.html'

let logger
let count = 0

export default {
  title: 'Channel Change test - 001',
  description: 'Loads the Channel Change URL and changes the channel for 1000 times',
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
      description: 'Attach to the logs to capture the log output and run the test',
      repeat: 30,
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
              resolve(count)
            }
          }
          console.log('Attaching to logs', hostIP)
          logger = new AttachToLogs(parseGoogleLogs, hostIP)
          logger.connect()
          setWebKitUrl.call(this, url)
        })
      },
    },
  ],
  validate(res) {
    //TODO Need to update this line
    if (res > 1000) {
      return true
    } else {
      throw new Error(`Channel change happened only ${res} times`)
    }
  },
}
