import config from '../../../../config'

export default {
  //Plugin Names
  monitorPlugin: 'Monitor',
  controllerPlugin: 'Controller',
  webKitBrowserPlugin: 'WebKitBrowser',
  webKitImplementation: 'WebKitImplementation',
  deviceInfo: 'DeviceInfo',
  youTubePlugin: 'YouTube',
  netFlixPlugin: 'Netflix',
  ocdmPlugin: 'OCDM',
  ocdmImplementation: 'OCDMImplementation',
  snapshotPlugin: 'Snapshot',
  webServerPlugin: 'WebServer',
  webServerImplementation: 'WebServerImplementation',
  provisioningPlugin: 'Provisioning',

  //Plugin states
  activate: 'activate',
  deactivate: 'deactivate',
  resume: 'resumed',
  suspend: 'suspend',

  blankUrl: 'about:blank',
  host: config.thunder.host,
}
