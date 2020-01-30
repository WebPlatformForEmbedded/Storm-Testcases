import { setWebKitUrl, webKitBrowserStartAndResume } from '../../commonMethods/commonFunctions'

let listener

export default {
  title: 'Framework stability set URL test',
  description:
    'Stress loads the system by setting the URL in a loop and see if the Framework process continues to operate nominally',
  setup() {
    return this.$sequence([
      () => webKitBrowserStartAndResume.call(this),
      () =>
        (listener = this.$thunder.api.WebKitBrowser.on('urlchange', data => {
          this.$data.write('currentUrl', data.url)
        })),
    ])
  },
  context: {
    //TODO - Update URL once the real URL is hosted on CDN
    url: 'http://cdn.metrological.com/static/eme-v3-clean.html',
  },
  steps: [
    {
      title: 'Repeat Steps for 100 times',
      description: 'Nested test to repeat the test for 100 times',
      repeat: 100,
      steps: [
        {
          description: 'Load URL',
          test() {
            return setWebKitUrl.call(this, this.$context.read('url'))
          },
          validate(res) {
            return res === this.$context.read('url')
          },
        },
        {
          description: 'Sleep until URL is loaded',
          sleep() {
            // Purpose of this sleep is to wait until current step gets 'url change' response from the listener
            return new Promise((resolve, reject) => {
              const interval = setInterval(() => {
                if (this.$data.read('currentUrl') === this.$context.read('url')) {
                  clearInterval(interval)
                  resolve()
                }
                reject('URL not loaded within time limit')
              }, 1000)
            })
          },
        },
      ],
    },
  ],
}
