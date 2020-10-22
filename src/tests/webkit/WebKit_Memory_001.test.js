import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import { bytesToMb, setUrl, suspendOrResumePlugin } from '../../commonMethods/commonFunctions'
import { getMonitorInfo } from '../../commonMethods/monitor'
import constants from '../../commonMethods/constants'

export default {
  title: 'WPEWebkit Memory test 001',
  description: 'Check suspended memory usage of WebKitBrowser',
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, 'WebKitBrowser'), //make sure the browser is turned off
      () => pluginDeactivate.call(this, 'UX'), //make sure UX is turned off
      () => pluginDeactivate.call(this, 'Netflix'), //make sure Netflix is turned off
      () => pluginDeactivate.call(this, 'Cobalt'), //make sure Cobalt is turned off
    ])
  },
  plugin: [constants.webKitBrowserPlugin, constants.youTubePlugin, constants.uxplugin],
  context: {
    MAX_MEMORY: 25, //Mb
    CALLSIGN: 'WebKitBrowser',
    URL: 'about:blank',
    resume: false,
    SLEEP: 5,
  },
  steps: [
    {
      description: 'Prepare plugin for measurement',
      test() {
        const seq = [
          () => pluginActivate.call(this, this.$context.read('CALLSIGN')),
          () => setUrl.call(this, this.$context.read('CALLSIGN'), 'about:blank'),
        ]

        if (this.$context.read('resume') === true) {
          this.$log(`Resuming ${this.$context.read('CALLSIGN')}`)
          seq.push(() =>
            suspendOrResumePlugin.call(this, this.$context.read('CALLSIGN'), 'resumed')
          )
          seq.push(
            () => setUrl.call(this, this.$context.read('CALLSIGN'), this.$context.read('URL')) //set url again to ensure it is loaded (sometimes it doesnt)
          )
        }

        return this.$sequence(seq)
      },
    },
    {
      description: 'Get Monitor Plugin Info',
      sleep() {
        return this.$context.read('SLEEP')
      },
      test() {
        return getMonitorInfo.call(this)
      },
      validate() {
        let monitorInfo = this.$data.read('monitorinfo')
        return this.$expect(monitorInfo).to.be.array() === true
      },
    },
  ],
  validate() {
    let plugin = this.$data.read('monitorinfo').filter(p => {
      if (p.observable === this.$context.read('CALLSIGN')) return true
    })[0]

    if (
      plugin !== undefined &&
      plugin.measurements !== undefined &&
      plugin.measurements.resident !== undefined &&
      plugin.measurements.resident.last !== undefined
    ) {
      const committedRSSMemory = bytesToMb(
        plugin.measurements.resident.last - plugin.measurements.shared.last
      )
      this.$log(`${this.$context.read('CALLSIGN')} memory usage ${committedRSSMemory}`)

      if (committedRSSMemory < this.$context.read('MAX_MEMORY')) return true
      else {
        this.$log(
          `${this.$context.read(
            'CALLSIGN'
          )} memory usage ${committedRSSMemory} is higher than ${this.$context.read(
            'MAX_MEMORY'
          )} while loading ${this.$context.read('URL')}`
        )
        return false
      }
    } else {
      this.$log('Resident memory measurement not found in monitor response')
      return false
    }
  },
}
