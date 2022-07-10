/**
 * indexモジュール
 * @module index
 * @see module:app
 */

/** expressオブジェクト */
const express = require('express')

/** routerオブジェクト */
const router = express.Router()

/** get index page */
const index = async (req, res, next) => {
  try {
    res.render('index', { title: 'Express' })
  } catch (error) {
    // https://neos21.hatenablog.com/entry/2020/06/14/080000
    next(error)
  }
}

router.get('/', index)

module.exports = router
