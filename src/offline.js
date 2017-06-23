const OfflinePlugin = require('offline-plugin/runtime')

const Offline = OfflinePlugin.install({
  onInstalled: function () {
    console.log('ok')
  },
  onUpdating: function () {

  },
  onUpdateReady: function () {
    OfflinePlugin.applyUpdate()
  },
  onUpdated: function () {
    window.location.reload()
  }
})

window.addEventListener('offline', function () {
  console.log('offline')
})

window.addEventListener('online', function () {
  console.log('online')
})

export default {
  Offline
}
