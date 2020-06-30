const Client = require('ssh2').Client

let host
export const setSshHost = h => (host = h)

/**
 * Generic ssh execute function, used mostly internally
 */
const exec = opts => {
  return new Promise((resolve, reject) => {
    opts.host = opts.host || host

    let conn = new Client()
    conn
      .on('ready', function() {
        conn.exec(opts.cmd, function(err, stream) {
          var res = ''
          if (err) reject(`Error starting ${opts.cmd}: ${err}`)
          if (opts.cbWhenStarted === true) resolve()

          stream
            .on('close', function(code, signal) {
              stream.end()
              conn.end()
              //if (res.length > 0) console.log(res)
              if (opts.cbWhenStarted !== true) resolve(res)
            })
            .on('data', function(data) {
              res += data
            })
            .stderr.on('data', function(data) {
              //err += data;
            })
        })
      })
      .connect({
        host: opts.host,
        port: opts.port || 22,
        username: opts.username || 'root',
        password: opts.password || 'root',
      })

    conn.on('timeout', function(e) {
      reject(`${opts.cmd}: Timeout while connecting to ${opts.host}`)
    })

    conn.on('error', function(err) {
      reject(`${opts.cmd}:  ${err}`)
    })
  })
}

/**
 * stop a process on the device
 */
export const stopProcess = process => {
  return exec({ cmd: `killall ${process}` })
}

/**
 * kill -9 (SIGTERM) a process on the device
 */
export const killProcess = process => {
  return exec({ cmd: `killall -9 ${process}` })
}

/**
 * check if process is running on the device
 */
export const checkIfProcessIsRunning = process => {
  let opts = {
    cmd: `ps w | grep ${process} | grep -v grep | awk ` + "'{printf(" + '"%i \\n\\r", $1)}' + "'",
  }

  return exec(opts).then(res => {
    //parse response as integer
    let resp

    try {
      resp = parseInt(res)
    } catch (e) {
      /*..*/
    }

    //only return true if valid number
    return isNaN(resp) === false ? true : false
  })
}

/**
 * get the CPU usage of a process, returns undefined if the process is not running
 */
export const getProcessCpuUsage = process => {
  let opts = {
    cmd:
      `top -bn1 | grep ${process} | grep -v grep | awk ` + "'{printf(" + '"%i \\n\\r", $7)}' + "'",
  }

  return exec(opts).then(res => {
    //parse response as integer
    let resp
    try {
      resp = parseInt(res)
    } catch (e) {
      /*..*/
    }

    //only return if valid number
    return isNaN(resp) === false ? resp : undefined
  })
}

/**
 * reboot using system reboot
 */
export const rebootSystem = () => {
  return exec({ cmd: '/sbin/reboot' })
}
