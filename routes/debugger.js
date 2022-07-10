/**
 * デバッガモジュール
 * @module debbuger
 */

/** debug関数 */
exports.debug = require('debug')('debug')

/** info関数 */
exports.info = require('debug')('info')

/** warning関数 */
exports.warn = require('debug')('warn')

/** error関数 */
exports.error = require('debug')('error')
