/**
 * WPETestFramework remote webinspector class
 */
/*jslint esnext: true*/
/*jslint node: true */
'use strict'

const WebSocket = require('ws')

/**
 * Attaches to the remote WebInspector to retrieve the console logs
 * NOTE: Only 1 webinspector connection can be made per host/agent, limited by the wpe webinspector itself
 */
export class AttachToLogs {
  constructor(cb, hostIP, port) {
    this.cb = cb
    this.port = port || '9998'
    this.hostIP = hostIP
    this.ws = undefined
  }

  connect() {
    this.ws = new WebSocket(`ws://${this.hostIP}:${this.port}/devtools/page/1`, {
      protocolVersion: 13,
      origin: `${this.hostIP}:${this.port}`,
      perMessageDeflate: true,
    })

    this.ws.on('open', () => {
      //console.log('ws open')
      // Only subscribe to Console.enable messages
      this.ws.send('{"id":1,"method":"Inspector.enable"}')
      this.ws.send('{"id":22,"method":"Console.enable"}')
      this.ws.send('{"id":23,"method":"Inspector.initialized"}')
    })

    this.ws.on('message', data => {
      var m = JSON.parse(data)

      /*
        Sample message from Console.messageAdded method:
        {"method":"Console.messageAdded",
            "params":{
                "message":{
                "source":"console-api","level":"log","text":"TestExecutor:  All tests are completed ","type":"log","line":122,"column":16,"url":"http://yt-dash-mse-test.commondatastorage.googleapis.com/unit-tests/js/harness/main-20170816122039.js","repeatCount":1,
                "parameters":[{"type":"string","value":"TestExecutor:  All tests are completed "}],"stackTrace":[{"functionName":"LOG","url":"http://yt-dash-mse-test.commondatastorage.googleapis.com/unit-tests/js/harness/main-20170816122039.js","scriptId":"2","lineNumber":122,"columnNumber":16},{"functionName":"log","url":"http://yt-dash-mse-test.commondatastorage.googleapis.com/unit-tests/js/harness/test-20170816122039.js","scriptId":"3","lineNumber":135,"columnNumber":12},{"functionName":"onfinished","url":"http://yt-dash-mse-test.commondatastorage.googleapis.com/unit-tests/js/harness/test-20170816122039.js","scriptId":"3","lineNumber":277,"columnNumber":13},{"functionName":"startNextTest","url":"http://yt-dash-mse-test.commondatastorage.googleapis.com/unit-tests/js/harness/test-20170816122039.js","scriptId":"3","lineNumber":326,"columnNumber":20},{"functionName":"","url":"[native code]","scriptId":"0","lineNumber":0,"columnNumber":0}]}}}
      */

      if (m.method === 'Console.messageAdded') this.cb(null, m.params.message.text)
    })

    this.ws.on('error', e => {
      //console.log('ws error', e)
      throw Error(e)
    })

    this.ws.on('close', () => {
      console.log('connection closed')
    })
  }

  disconnect() {
    console.log('Closing attachToLogs websocket connection')
    if (this.ws) this.ws.close()
  }
}
