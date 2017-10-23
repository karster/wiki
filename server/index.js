// ===========================================
// Wiki.js
// Licensed under AGPLv3
// ===========================================

const path = require('path')
const cluster = require('cluster')

let wiki = {
  IS_DEBUG: process.env.NODE_ENV === 'development',
  IS_MASTER: cluster.isMaster,
  ROOTPATH: process.cwd(),
  SERVERPATH: path.join(process.cwd(), 'server'),
  configSvc: require('./modules/config'),
  kernel: require('./modules/kernel')
}
global.wiki = wiki

process.env.VIPS_WARNING = false

// if (wiki.IS_DEBUG) {
//   require('@glimpse/glimpse').init()
// }

wiki.configSvc.init()

// ----------------------------------------
// Init Logger
// ----------------------------------------

wiki.logger = require('./modules/logger').init()

// ----------------------------------------
// Init Telemetry
// ----------------------------------------

wiki.telemetry = require('./modules/telemetry').init()

// ----------------------------------------
// Init DB
// ----------------------------------------

wiki.db = require('./modules/db').init()

// ----------------------------------------
// Start Kernel
// ----------------------------------------

wiki.kernel.init()
