import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import { calcAvgFPS, setUrl } from '../../commonMethods/commonFunctions'

let listener

const navigateAndMeasure = function(key) {
  this.$thunder.remoteControl[key].call(this)

  return this.$thunder.api.UX.fps()
    .then(result => {
      if (isNaN(result) === false) {
        let samples = this.$data.read('samples')
        this.$log('FPS ' + result)
        samples.push(result)
        this.$data.write('samples', samples)
      }
    })
    .catch(err => err)
}

export default {
  context: {
    minFPS: 30,
    url:
      'https://widgets.metrological.com/lightning/metrological/f5d28e6d86c88193fcbf50602c6a30ec#app:com.metrological.app.VimeoRelease',
  },
  setup() {
    this.$data.write('samples', [])
    return this.$sequence([
      () => pluginDeactivate.call(this, 'WebKitBrowser'), //make sure the browser is turned off
      () => pluginDeactivate.call(this, 'UX'), //make sure UX is turned off
      () => pluginDeactivate.call(this, 'Netflix'), //make sure Netflix is turned off
      () => pluginDeactivate.call(this, 'Cobalt'), //make sure Cobalt is turned off
      () => pluginActivate.call(this, 'UX'),
      () => setUrl.call(this, 'UX', 'about:blank'),
      () => {
        return this.$thunder.api.call('UX', 'state', 'resumed')
      },
      () => {
        listener = this.$thunder.api.UX.on(
          'urlchange',
          data => {
            this.$log('Got urlchange event: ', data.url)
            this.$data.write('currentUrl', data.url)
          },
          e => {
            this.$log('Error subscribing to urlchange: ', e)
          }
        )
        return true
      },
    ])
  },
  teardown() {
    pluginDeactivate.call(this, 'UX')
    listener.dispose()
  },
  title: 'UX Vimeo performance test',
  description: 'Loads the Vimeo and measures its performance',
  steps: [
    {
      description: 'Navigating to Vimeo',
      test() {
        this.$log('Setting url: ', this.$context.read('url'))
        return setUrl.call(this, 'UX', this.$context.read('url'))
      },
    },
    {
      description: 'Sleep until URL is loaded',
      sleep() {
        // Purpose of this sleep is to wait until current step gets 'url change' response from the listener
        return new Promise((resolve, reject) => {
          let attempts = 0
          const interval = setInterval(() => {
            attempts++
            if (this.$data.read('currentUrl') === this.$context.read('url')) {
              clearInterval(interval)
              setTimeout(resolve, 5000) //give it some time to load
            } else if (attempts > 10) {
              clearInterval(interval)
              reject('URL not loaded within time limit')
            }
          }, 1000)
        })
      },
    },
    {
      description: 'Navigate around in Vimeo',
      sleep: 5, //give it some time to load
      test() {
        return this.$sequence([
          () => navigateAndMeasure.call(this, 'down'),
          () => navigateAndMeasure.call(this, 'right'),
          () => navigateAndMeasure.call(this, 'right'),
          () => navigateAndMeasure.call(this, 'right'),
          () => navigateAndMeasure.call(this, 'right'),
          () => navigateAndMeasure.call(this, 'right'),
          () => navigateAndMeasure.call(this, 'right'),
          () => navigateAndMeasure.call(this, 'right'),
          () => navigateAndMeasure.call(this, 'right'),
          () => navigateAndMeasure.call(this, 'right'),
          () => navigateAndMeasure.call(this, 'right'),
          () => navigateAndMeasure.call(this, 'right'),
          () => navigateAndMeasure.call(this, 'left'),
          () => navigateAndMeasure.call(this, 'left'),
          () => navigateAndMeasure.call(this, 'left'),
          () => navigateAndMeasure.call(this, 'left'),
          () => navigateAndMeasure.call(this, 'left'),
          () => navigateAndMeasure.call(this, 'left'),
          () => navigateAndMeasure.call(this, 'left'),
          () => navigateAndMeasure.call(this, 'left'),
          () => navigateAndMeasure.call(this, 'left'),
          () => navigateAndMeasure.call(this, 'left'),
          () => navigateAndMeasure.call(this, 'left'),
          () => navigateAndMeasure.call(this, 'down'),
          () => navigateAndMeasure.call(this, 'down'),
          () => navigateAndMeasure.call(this, 'down'),
          () => navigateAndMeasure.call(this, 'down'),
          () => navigateAndMeasure.call(this, 'up'),
          () => navigateAndMeasure.call(this, 'up'),
          () => navigateAndMeasure.call(this, 'up'),
          () => navigateAndMeasure.call(this, 'up'),
        ])
      },
    },
    {
      description: 'Calculate average FPS',
      test: calcAvgFPS,
    },
  ],
  validate() {
    let average = this.$data.read('average')
    this.$log('Average FPS ' + average)
    return this.$expect(Math.ceil(average)).to.be.greaterThan(this.$context.read('minFPS'))
  },
}
