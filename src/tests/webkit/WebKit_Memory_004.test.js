import baseTest from './WebKit_Memory_001.test.js'

export default {
  ...baseTest,
  ...{
    context: {
      MAX_MEMORY: 85, //Mb
      CALLSIGN: 'WebKitBrowser',
      URL:
        'https://widgets.metrological.com/lightning/metrological/f5d28e6d86c88193fcbf50602c6a30ec#app:com.metrological.app.VimeoRelease',
      resume: true,
      SLEEP: 30,
    },
    title: 'WPEWebkit Memory test 004',
    description: 'Load vimeo and test memory usage after navigating around',
    steps: [
      baseTest.steps[0],
      {
        description: 'Navigate around in Vimeo',
        sleep: 10,
        test() {
          return this.$sequence([
            () => this.$thunder.remoteControl.down(),
            () => this.$thunder.remoteControl.right(),
            () => this.$thunder.remoteControl.right(),
            () => this.$thunder.remoteControl.right(),
            () => this.$thunder.remoteControl.right(),
            () => this.$thunder.remoteControl.right(),
            () => this.$thunder.remoteControl.right(),
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
            () => this.$thunder.remoteControl.left(),
            () => this.$thunder.remoteControl.left(),
            () => this.$thunder.remoteControl.left(),
            () => this.$thunder.remoteControl.left(),
            () => this.$thunder.remoteControl.left(),
            () => this.$thunder.remoteControl.down(),
            () => this.$thunder.remoteControl.down(),
            () => this.$thunder.remoteControl.down(),
            () => this.$thunder.remoteControl.down(),
            () => this.$thunder.remoteControl.up(),
            () => this.$thunder.remoteControl.up(),
            () => this.$thunder.remoteControl.up(),
            () => this.$thunder.remoteControl.up(),
          ])
        },
      },
      baseTest.steps[1],
    ],
  },
}
