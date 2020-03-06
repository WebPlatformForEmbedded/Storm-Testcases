import config from '../../../../config'

export default {
  //Plugin Names
  monitorPlugin: 'Monitor',
  controllerPlugin: 'Controller',
  webKitBrowserPlugin: 'WebKitBrowser',
  webKitImplementation: 'WebKitImplementation',
  deviceInfo: 'DeviceInfo',
  youTubePlugin: 'Cobalt',
  netFlixPlugin: 'Netflix',
  ocdmPlugin: 'OCDM',
  timeSyncPlugin: 'TimeSync',
  locationSyncPlugin: 'LocationSync',
  networkControlPlugin: 'NetworkControl',
  ocdmImplementation: 'OCDMImplementation',
  snapshotPlugin: 'Snapshot',
  webServerPlugin: 'WebServer',
  webServerImplementation: 'WebServerImplementation',
  netflixImplementation: 'NetflixImplementation',
  youtubeImplementation: 'CobaltImplementation',
  provisioningPlugin: 'Provisioning',
  WPEProcess: 'WPEProcess',
  remoteControlPlugin: 'RemoteControl',
  invalidAddress: 'invalidstring',

  //Plugin states
  activate: 'activate',
  deactivate: 'deactivate',
  resume: 'resumed',
  suspend: 'suspended',
  WPEFramework: 'WPEFramework',
  blankUrl: 'about:blank',
  host: config.thunder.host,
}
