import goToAppStore from './helpers/goToAppstore'

const appStoreUrl =
  'http://widgets.metrological.com/lightning/metrological/8c166615d232122a553531608270e5f3?direct=true&texture#boot'

let listener

export default {
  title: 'App Store - Weather network',
  description: 'Navigate through the App Store and open the Weather network App',
  setup() {
    listener = this.$thunder.api.WebKitBrowser.on('urlchange', data => {
      this.$data.write('currentUrl', data.url)
    })
    return goToAppStore.call(this, appStoreUrl)
  },
  teardown() {
    listener.dispose()
  },
  steps: [
    {
      description: 'Navigate to Weather App',
      sleep() {
        // sleep until the app store has loaded ...
        return new Promise((resolve, reject) => {
          let attempts = 0
          const interval = setInterval(() => {
            attempts++
            if (this.$data.read('currentUrl') === appStoreUrl) {
              clearInterval(interval)
              resolve()
            } else if (attempts > 10) {
              clearInterval(interval)
              reject('Appstore not loaded within time limit')
            }
          }, 1000)
        })
      },
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
      sleep() {
        // sleep until the app has loaded ...
        return new Promise((resolve, reject) => {
          let attempts = 0
          const interval = setInterval(() => {
            attempts++
            if (this.$data.read('currentUrl').indexOf('com.metrological.app.WeatherNetwork') > -1) {
              clearInterval(interval)
              resolve()
            } else if (attempts > 10) {
              clearInterval(interval)
              reject('App not loaded within time limit')
            }
          }, 1000)
        })
      },
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
    return this.$thunder.api.WebKitBrowser.url().then(
      url => this.$expect(url).equal(appStoreUrl) === true
    )
  },
}
