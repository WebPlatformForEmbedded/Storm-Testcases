import constants from '../../commonMethods/constants'
import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import { setWebKitUrl, webKitBrowserActions } from '../../commonMethods/webKitBrowser'
import { getCpuLoad } from '../../commonMethods/deviceInfo'

export default {
  title: 'WPEWebkit Suspend/Resume robustness test',
  description:
    'Suspends and Resumes WPEWebkit plugin repeatedly and checks if everything is started correctly',
  context: {
    cpuLoad: 90,
  },
  plugin: [constants.webKitBrowserPlugin, constants.youTubePlugin, constants.uxplugin],
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, 'WebKitBrowser'), //make sure the browser is turned off
      () => pluginDeactivate.call(this, 'UX'), //make sure UX is turned off
      () => pluginDeactivate.call(this, 'Netflix'), //make sure Netflix is turned off
      () => pluginDeactivate.call(this, 'Cobalt'), //make sure Cobalt is turned off
      () => pluginActivate.call(this, 'WebKitBrowser'),
      () => setWebKitUrl.call(this, constants.blankUrl),
      () => {
        return this.$thunder.api.call('WebKitBrowser', 'state', 'resumed')
      },
    ])
  },
  steps: [
    {
      title: 'Repeat Steps for 30 times',
      description: 'Nested test to repeat the test for 30 times',
      repeat: 30,
      steps: [
        {
          description: 'Suspend Webkit Plugin and check if it is suspended',
          test: webKitBrowserActions,
          params: constants.suspend,
          assert: 'suspended',
        },
        {
          description: 'Resume Webkit Plugin and check if it is resumed',
          test: webKitBrowserActions,
          params: constants.resume,
          assert: 'resumed',
        },
        {
          description: 'Get CPU load',
          test: getCpuLoad,
          params: constants.deviceInfo,
          validate() {
            let cpuload = this.$data.read('cpuload')
            this.$log('Cpu Load is', cpuload)
            if (cpuload > 90) {
              throw new Error('CPU load is greater than 90')
            } else {
              return true
            }
          },
        },
      ],
    },
  ],
}
