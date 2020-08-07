import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import { setWebKitUrl } from '../../commonMethods/webKitBrowser'
import constants from '../../commonMethods/constants'
import { AttachToLogs } from '../../commonMethods/remoteWebInspector'
import ThunderJS from 'ThunderJS'

let logger
let count = 0
let hostIP
let getDeviceInfo = () => {
  return new Promise(resolve => {
    ThunderJS({ hostIP })
      .DeviceInfo.systeminfo()
      .then(result => {
        resolve(result)
      })
  })
}

let getMemoryInfo = () => {
  return new Promise(resolve => {
    ThunderJS({ hostIP })
      .Monitor.status()
      .then(result => {
        resolve(result)
      })
  })
}
export default {
  title: 'Channel Change test - 001',
  description: 'Loads the Channel Change URL and changes the channel for 1000 times',
  context: {
    url: 'http://cdn.metrological.com/static/storm/cc_time_v2.html?test_duration=168',
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
      description: 'Change the channel continuously for 1000 times and check the behavior',
      sleep: 5,
      test() {
        return new Promise((resolve, reject) => {
          let hostIP = this.$thunder.api.options.host
          async function parseGoogleLogs(error, log) {
            console.log(log)
            const testStarted = /Tuning to channel/g
            const testsDone = /Test ended/g
            if (testStarted.test(log)) {
              let cpuLoad = await getDeviceInfo()
              let pluginMemoryInfo = await getMemoryInfo()
              if (cpuLoad.cpuload > 90) {
                logger.disconnect()
                reject('CPU load is greater than expected')
              } else {
                console.log(
                  `CPU load after changing channel for ${count + 1} times is ${cpuLoad.cpuload}`
                )
                let plugin = pluginMemoryInfo.filter(p => {
                  if (p.observable === 'WebKitBrowser') return true
                })[0]

                if (
                  plugin !== undefined &&
                  plugin.measurements !== undefined &&
                  plugin.measurements.resident !== undefined &&
                  plugin.measurements.resident.last !== undefined
                ) {
                  const committedRSSMemory =
                    (plugin.measurements.resident.last - plugin.measurements.shared.last) /
                    (1024 * 1024)
                  if (committedRSSMemory < 300) {
                    console.log(
                      `Memory after changing channel for ${count +
                        1} times is ${committedRSSMemory}`
                    )
                    count = count + 1
                    return true
                  } else {
                    reject(
                      `WebKitBrowser memory usage ${committedRSSMemory} is higher than 300 while tuning channel for the ${count} time`
                    )
                  }
                } else {
                  reject('Resident memory measurement not found in monitor response')
                }
              }
            }
            if (testsDone.test(log)) {
              logger.disconnect()
              resolve(count)
            }
          }
          console.log('Attaching to logs', hostIP)
          logger = new AttachToLogs(parseGoogleLogs, hostIP)
          logger.connect()
          setWebKitUrl.call(this, this.$context.read('url'))
        })
      },
    },
  ],
  validate() {
    if (count > 1000) {
      return true
    } else {
      throw new Error(`Channel change happened only ${count} times`)
    }
  },
}
