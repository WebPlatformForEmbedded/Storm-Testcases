import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import { setWebKitUrl } from '../../commonMethods/webKitBrowser'
import { screenshot } from '../../commonMethods/commonFunctions'
import resemble from 'node-resemble-js'
import constants from '../../commonMethods/constants'

let listener

export default {
  context: {
    url: 'http://cdn.metrological.com/static/testbot/v1/resize_video.html',
  },
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
      () => {
        listener = this.$thunder.api.WebKitBrowser.on(
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
    setWebKitUrl.call(this, constants.blankUrl)
    listener.dispose()
  },
  title: 'Video resizing test',
  description: 'Start a test video and resize to different sizes',
  steps: [
    {
      description: 'Navigating to Resize Video URL',
      test() {
        this.$log(this.$context.read('url'))
        return setWebKitUrl.call(this, this.$context.read('url'))
      },
      validate(url) {
        return url === this.$context.read('url')
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
              resolve()
            } else if (attempts > 10) {
              clearInterval(interval)
              reject('URL not loaded within time limit')
            }
          }, 1000)
        })
      },
    },
    {
      description: 'Change the resolution to 320x240',
      test() {
        this.$thunder.remoteControl.key(1)
      },
      validate(res) {
        if (res === null) return true
        else {
          throw new Error(`Result is not as expected and is ${res}`)
        }
      },
    },
    {
      description: 'Get a screenshot',
      test: screenshot,
      validate() {
        let resp = this.$data.read('screenshotResult')
        this.$data.write('screenshot', resp)
        if (resp === undefined || resp.length === 0) {
          throw new Error('Error while reading snapshot from Framework')
        } else {
          return true
        }
      },
    },
    {
      description: 'verify if the resolution change happened',
      test() {
        let screenshot = this.$data.read('screenshot')
        resemble('../../resources/res_320x240.png')
          .compareTo(screenshot)
          .ignoreColors()
          .onComplete(function(data) {
            if (Number(data.misMatchPercentage) <= 0.01) {
              return true
            } else {
              throw new Error('Screenshot differs ' + data.misMatchPercentage + '%')
            }
          })
      },
    },
    {
      description: 'Change the resolution to 640x480',
      test() {
        this.$thunder.remoteControl.key(2)
      },
      validate(res) {
        if (res === null) return true
        else {
          throw new Error(`Result is not as expected and is ${res}`)
        }
      },
    },
    {
      description: 'Get a screenshot',
      test: screenshot,
      validate() {
        let resp = this.$data.read('screenshotResult')
        this.$data.write('screenshot', resp)
        if (resp === undefined || resp.length === 0) {
          throw new Error('Error while reading snapshot from Framework')
        } else {
          return true
        }
      },
    },
    {
      description: 'verify if the resolution change happened',
      test() {
        let screenshot = this.$data.read('screenshot')
        resemble('../../resources/res_640x480.png')
          .compareTo(screenshot)
          .ignoreColors()
          .onComplete(function(data) {
            if (Number(data.misMatchPercentage) <= 0.01) {
              return true
            } else {
              throw new Error('Screenshot differs ' + data.misMatchPercentage + '%')
            }
          })
      },
    },
    {
      description: 'Change the resolution to 1280x720',
      test() {
        this.$thunder.remoteControl.key(3)
      },
      validate(res) {
        if (res === null) return true
        else {
          throw new Error(`Result is not as expected and is ${res}`)
        }
      },
    },
    {
      description: 'Get a screenshot',
      test: screenshot,
      validate() {
        let resp = this.$data.read('screenshotResult')
        this.$data.write('screenshot', resp)
        if (resp === undefined || resp.length === 0) {
          throw new Error('Error while reading snapshot from Framework')
        } else {
          return true
        }
      },
    },
    {
      description: 'verify if the resolution change happened',
      test() {
        let screenshot = this.$data.read('screenshot')
        resemble('../../resources/res_1280x720.png')
          .compareTo(screenshot)
          .ignoreColors()
          .onComplete(function(data) {
            if (Number(data.misMatchPercentage) <= 0.01) {
              return true
            } else {
              throw new Error('Screenshot differs ' + data.misMatchPercentage + '%')
            }
          })
      },
    },
    {
      description: 'Change the resolution to 1920x1080',
      test() {
        this.$thunder.remoteControl.key(4)
      },
      validate(res) {
        if (res === null) return true
        else {
          throw new Error(`Result is not as expected and is ${res}`)
        }
      },
    },
    {
      description: 'Get a screenshot',
      test: screenshot,
      validate() {
        let resp = this.$data.read('screenshotResult')
        this.$data.write('screenshot', resp)
        if (resp === undefined || resp.length === 0) {
          throw new Error('Error while reading snapshot from Framework')
        } else {
          return true
        }
      },
    },
    {
      description: 'verify if the resolution change happened',
      test() {
        let screenshot = this.$data.read('screenshot')
        resemble('../../resources/res_1920x1080.png')
          .compareTo(screenshot)
          .ignoreColors()
          .onComplete(function(data) {
            if (Number(data.misMatchPercentage) <= 0.01) {
              return true
            } else {
              throw new Error('Screenshot differs ' + data.misMatchPercentage + '%')
            }
          })
      },
    },
  ],
}
