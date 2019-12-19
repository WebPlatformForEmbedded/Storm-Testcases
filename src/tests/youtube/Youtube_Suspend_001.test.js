import { pluginDeactivate, getCpuLoad, pluginActivate } from '../../commonMethods/commonFunctions'
import constants from '../../commonMethods/constants'

export default {
  title: 'YouTube Suspend/Resume robustness test',
  description:
    'Suspends and Resumes YouTube plugin repeatedly and checks if everything is started correctly',
  repeat: 30,
  context: {
    cpuLoad: 90,
  },
  steps: [
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
        if (result === 'suspended') return true
        else return false
      },
    },
    {
      description: 'Get CPU load',
      sleep: 5,
      test: getCpuLoad,
      params: constants.deviceInfo,
    },
  ],
  validate() {
    let cpuload = this.$data.read('cpuload')
    this.$log('CPU load is ', cpuload)
    if (cpuload > 90) {
      this.$log('CPU load is greater than 90')
      return false
    } else {
      return true
    }
  },
}
