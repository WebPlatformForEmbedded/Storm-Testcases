import goToAppStore from './helpers/goToAppstore'

const appStoreUrl =
  'http://widgets.metrological.com/lightning/metrological/8c166615d232122a553531608270e5f3?direct=true&texture#boot'

export default {
  title: 'App Store - Game Stream',
  description: 'Navigate through the App Store and open the Gamestream App',
  setup() {
    return goToAppStore.call(this, appStoreUrl)
  },
  steps: [
    {
      description: 'Navigate to Weather App',
      sleep: 2,
      test() {
        return this.$thunder.remoteControl.right(5)
      },
      assert: null,
    },
    {
      description: 'Click ok and open the Game Stream App',
      test() {
        return this.$thunder.remoteControl.ok()
      },
      assert: null,
    },
    {
      description: 'Navigate to a game',
      sleep: 10,
      test() {
        return this.$thunder.remoteControl
          .right()
          .then(() => this.$thunder.remoteControl.down(8, 1000))
      },
      assert: null,
    },
    {
      description: 'Open the game',
      sleep: 2,
      test() {
        return this.$thunder.remoteControl.ok()
      },
      assert: null,
    },
    {
      description: 'Navigate to a video',
      sleep: 2,
      test() {
        return this.$thunder.remoteControl.down(2, 1000).then(() =>
          this.$thunder.remoteControl.right(1, 1000).then(() => {
            this.$thunder.remoteControl.ok()
          })
        )
      },
      assert: null,
    },
    {
      description: 'Exit the App after watching the video for 30 seconds',
      sleep: 30,
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
