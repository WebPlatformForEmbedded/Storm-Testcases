import baseTest from './WebKit_Memory_001.test.js'
import constants from '../../commonMethods/constants'

export default {
  ...baseTest,
  ...{
    context: {
      MAX_MEMORY: 85, //Mb
      CALLSIGN: 'WebKitBrowser',
      URL:
        'https://widgets.metrological.com/lightning/metrological/f5d28e6d86c88193fcbf50602c6a30ec',
      resume: true,
      SLEEP: 30,
    },
    plugin: [constants.webKitBrowserPlugin, constants.youTubePlugin, constants.uxplugin],
    title: 'WPEWebkit Memory test 005',
    description: 'Load appstore, navigate around and check memory usage',
    steps: [
      baseTest.steps[0],
      {
        description: 'Navigate around in the App Store',
        sleep: 10,
        test() {
          return this.$sequence([
            () => this.$thunder.remoteControl.down(),
            () => this.$thunder.remoteControl.down(),
            () => this.$thunder.remoteControl.down(),
            () => this.$thunder.remoteControl.down(),
            () => this.$thunder.remoteControl.right(),
            () => this.$thunder.remoteControl.right(),
            () => this.$thunder.remoteControl.right(),
            () => this.$thunder.remoteControl.right(),
            () => this.$thunder.remoteControl.right(),
            () => this.$thunder.remoteControl.left(),
            () => this.$thunder.remoteControl.left(),
            () => this.$thunder.remoteControl.left(),
            () => this.$thunder.remoteControl.left(),
            () => this.$thunder.remoteControl.left(),
            () => this.$thunder.remoteControl.left(),
            () => this.$thunder.remoteControl.up(),
            () => this.$thunder.remoteControl.up(),
            () => this.$thunder.remoteControl.up(),
            () => this.$thunder.remoteControl.up(),
            () => this.$thunder.remoteControl.up(),
            () => this.$thunder.remoteControl.down(),
            () => this.$thunder.remoteControl.down(),
            () => this.$thunder.remoteControl.down(),
            () => this.$thunder.remoteControl.down(),
            () => this.$thunder.remoteControl.down(),
          ])
        },
      },
      baseTest.steps[1],
    ],
  },
}
