import goToAppStore from './helpers/goToAppstore'

const appStoreUrl =
  'http://widgets.metrological.com/lightning/metrological/8c166615d232122a553531608270e5f3?direct=true&texture#boot'

export default {
  title: 'App Store - Weather network',
  description: 'Navigate through the App Store and open the Weather network App',
  setup() {
    return goToAppStore.call(this, appStoreUrl)
  },
  steps: [
    {
      description: 'Navigate to Weather App',
      sleep: 2,
      test() {
        return this.$thunder.remoteControl.right(6)
      },
      assert: null,
    },
    {
      description: 'Click ok and open the Weather Network App',
      test() {
        return this.$thunder.remoteControl.ok()
      },
      assert: null,
    },
    {
      description: 'Click ok and open the first video',
      sleep: 10,
      test() {
        return this.$thunder.remoteControl.ok()
      },
      assert: null,
    },
    {
      description: 'Pause the video after 10 seconds',
      sleep: 10,
      test() {
        return this.$thunder.remoteControl.ok()
      },
      assert: null,
    },
    {
      description: 'Start the video again 5 seconds',
      sleep: 5,
      test() {
        return this.$thunder.remoteControl.ok()
      },
      assert: null,
    },
    {
      description: 'Stop the video after 10 seconds',
      sleep: 10,
      test() {
        return this.$thunder.remoteControl.right().then(() => this.$thunder.remoteControl.ok())
      },
      assert: null,
    },
    {
      description: 'Navigate to another video and open it',
      test() {
        return this.$thunder.remoteControl.right(10).then(() => this.$thunder.remoteControl.ok())
      },
      assert: null,
    },
    {
      description: 'Exit the App after watching the video for 10 seconds',
      sleep: 10,
      test() {
        return this.$thunder.remoteControl.exit()
      },
      validate: null,
    },
  ],
  validate() {
    return this.$thunder.WebKitBrowser.url().then(url => this.$expect(url) === appStoreUrl)
  },
}
