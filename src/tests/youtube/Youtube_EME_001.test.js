import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import { setWebKitUrl } from '../../commonMethods/webKitBrowser'
import constants from '../../commonMethods/constants'
import { AttachToLogs } from '../../commonMethods/remoteWebInspector'

let url =
  'https://yt-dash-mse-test.commondatastorage.googleapis.com/unit-tests/2018.html?test_type=encryptedmedia-test&enablewebm=off&command=run'

let logger

export default {
  title: 'YouTube Encrypted Media conformance test',
  description: 'Loads the YouTube EME 2018 conformance test and captures the output',
  setup() {
    return this.$sequence([
      () => this.$data.write('testCount', 40),
      () => pluginDeactivate.call(this, 'WebKitBrowser'), //make sure the browser is turned off
      () => pluginDeactivate.call(this, 'UX'), //make sure UX is turned off
      () => pluginDeactivate.call(this, 'Netflix'), //make sure Netflix is turned off
      () => pluginDeactivate.call(this, 'Cobalt'), //make sure Cobalt is turned off
      () => pluginActivate.call(this, 'WebKitBrowser'),
      () => {
        return this.$thunder.api.call('WebKitBrowser', 'state', 'resumed')
      },
    ])
  },
  teardown() {
    logger.disconnect()
    setWebKitUrl.call(this, constants.blankUrl)
  },
  steps: [
    {
      description: 'Attach to the logs to capture the log output and run the test',
      timeout: 10 * 60, // 10 minutes
      sleep: 5,
      test() {
        return new Promise((resolve, reject) => {
          let ready = false
          let testOK
          let testsRun = 0
          let testsFailed = 0
          let testsTimedout = 0
          let failedTests = []
          let timedoutTests = []
          let currentTest
          let hostIP = this.$thunder.api.options.host

          function _results() {
            let results = {
              failed: {
                amount: testsFailed,
                tests: failedTests,
              },
              timedout: {
                amount: testsTimedout,
                tests: timedoutTests,
              },
              testsRun: testsRun,
            }

            resolve(results)
          }

          function parseGoogleLogs(error, log) {
            console.log(log)
            if (!ready) return
            const testStarted = /STARTED/g
            const testSucceeded = /PASSED./g
            const testTimedout = /TIMED OUT!/g
            const testFailed = /FAILED/g
            const testsDone = /All tests are completed/g
            if (testStarted.test(log)) {
              //Information: TestExecutor:  Test 29:VideoBufferSize STARTED with timeout 30000
              let test = log.split('TestExecutor:  Test ')[1]
              currentTest = test.split(' STARTED with timeout')[0]
              testsRun++
              console.log('Test ' + currentTest + ' started')
            }
            if (testSucceeded.test(log)) {
              testOK++
              console.log('Test ' + currentTest + ' succeeded')
            }
            if (testTimedout.test(log)) {
              timedoutTests.push(currentTest)
              testsTimedout++
              console.log('Test ' + currentTest + ' timedout')
            }

            if (testFailed.test(log)) {
              failedTests.push(currentTest)
              testsFailed++
              console.log('Test ' + currentTest + ' failed')
            }

            if (testsDone.test(log)) {
              return _results()
            }
          }
          console.log('Attaching to logs', hostIP)
          logger = new AttachToLogs(parseGoogleLogs, hostIP)
          logger.connect()
          setWebKitUrl.call(this, url)
        })
      },
    },
  ],
  validate(results) {
    if (
      results &&
      results.failed.amount === 0 &&
      results.timedout.amount === 0 &&
      results.testsRun === this.$data.read('testCount')
    )
      return true

    let error = `Tests run: ${results.testsRun} of ${this.$data.read('testCount')}. `
    error += 'Tests failed: ' + results.failed.tests + '. '
    error += 'Tests timedout: ' + results.timedout.tests + '. '
    throw new Error(error)
  },
}
