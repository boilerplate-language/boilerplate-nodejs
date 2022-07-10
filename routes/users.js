/**
 * userモジュール
 * @module user
 * @see module:app
 */

/** expressオブジェクト */
const express = require('express')

/** routerオブジェクト */
const router = express.Router()

/* GET users listing. */
const users = async (req, res, next) => {
  try {
    res.send('respond with a resource')
  } catch (error) {
    // https://neos21.hatenablog.com/entry/2020/06/14/080000
    next(error)
  }
}

router.get('/', users)

module.exports = router
