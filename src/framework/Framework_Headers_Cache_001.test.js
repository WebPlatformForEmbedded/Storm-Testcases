import { getPluginInfo, getResponseForURLRequest } from '../commonMethods/commonFunctions'
import constants from '../commonMethods/constants'

let count = 0
export default {
  title: 'Validate cache headers on all plugins',
  description: 'Iterate over all plugins and verify their cache headers when activated',
  steps: [
    {
      description: 'Check if response is a JSON response',
      test: getPluginInfo,
      params: constants.controllerPlugin,
      validate(result) {
        this.$data.write('pluginData', result.data)
        return this.$expect(result).to.be.object() === true
      },
    },
    {
      description: 'Parse list of modules in the URL',
      test() {
        let urls = []
        let controllerResp = this.$data.read('pluginData')
        urls.push({ method: 'GET', path: '/Service/Controller' })
        for (let i = 0; i < controllerResp.plugins.length; i++) {
          let module = controllerResp.plugins[i].callsign
          if (module === 'Controller') continue
          if (
            controllerResp.plugins[i].state.toLowerCase() === 'activated' ||
            controllerResp.plugins[i].state.toLowerCase() === 'resumed'
          ) {
            if (module === 'WebServer' || module === 'WebProxy') {
              urls.push({ method: 'GET', path: `/Service/Controller/${module}` })
            } else {
              urls.push({ method: 'GET', path: `/Service/${module}` })
            }
          } else {
            urls.push({ method: 'PUT', path: `/Service/Controller/Activate/${module}` })
            urls.push({ method: 'GET', path: `/Service/${module}` })
          }
        }
        this.$data.write('urlinfo', urls)
      },
    },
    {
      description: 'Call all URLs in generated list',
      repeat() {
        let urlLength = this.$data.read('urlinfo').length
        return urlLength - 1
      },
      test() {
        let urlInfo = this.$data.read('urlinfo')
        let url = `http://${constants.host}:80${urlInfo[count].path}`
        let methodType = urlInfo[count].method
        count++
        return getResponseForURLRequest.call(this, methodType, url)
      },
      validate(res) {
        let headerObj = res.headers
        let urlInfo = this.$data.read('urlinfo')
        if (
          headerObj['cache-control'] === undefined &&
          headerObj['access-control-allow-origin'] === undefined
        ) {
          this.$log(
            `Error making request ${urlInfo[count - 1].method} ${urlInfo[count - 1].path}: ${res.error}`
          )
        } else return true
      },
    },
  ],
}
