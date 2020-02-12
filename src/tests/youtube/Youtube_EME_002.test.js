import {
  pluginDeactivate,
  webKitBrowserStartAndResume,
  setWebKitUrl,
} from '../../commonMethods/commonFunctions'
import constants from '../../commonMethods/constants'
import { AttachToLogs } from '../../commonMethods/remoteWebInspector'

let url =
  'https://yt-dash-mse-test.commondatastorage.googleapis.com/unit-tests/2017.html?test_type=encryptedmedia-test&command=run'

export default {
  title: 'YouTube Encrypted Media conformance test',
  description: 'Loads the YouTube EME 2017 conformance test and captures the output',
  setup() {
    this.$data.write('testCount', 9)
  },
  teardown() {
    setWebKitUrl.call(this, constants.blankUrl)
  },
  steps: [
    {
      description: 'Check if WPEWebkit is stopped correctly',
      test: pluginDeactivate,
      params: constants.webKitBrowserPlugin,
      assert: 'deactivated',
    },
    {
      description: 'Activating WebKit Browser Plugin',
      test: webKitBrowserStartAndResume,
      assert: 'resumed',
    },
    {
      description: 'Attach to the logs to capture the log output and run the test',
      timeout: 10 * 60, // 10 minutes
      test() {
        let ready = false
        let testOK
        let testsRun = 0
        let testsFailed = 0
        let testsTimedout = 0
        let failedTests = []
        let timedoutTests = []
        let currentTest

        function readyToParse() {
          ready = true
        }

        async function parseGoogleLogs(error, log) {
          //console.log(log);
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
            let results = await _results()
            return results
          }
          let _results = new Promise((resolve, reject) => {
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
            logger.disconnect()
            resolve(results)
          })
        }
        let logger = new AttachToLogs(parseGoogleLogs)
        logger.connect(readyToParse.call(this), setWebKitUrl.call(this, url))
      },
    },
  ],
  validate(results) {
    if (
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
