const request = require('supertest')
const sinon = require('sinon')
const rewire = require('rewire')
const assert = require('assert')
const app = rewire('../app')

describe('app test', () => {
  it('GET invalid path', (done) => {
    request(app)
      .get('/hogehoeg')
      .expect(404)
      .end(done)
  })

  it('Call error handler with 500 error', (done) => {
    const err = {
      message: 'test message',
      status: 404
    }
    const req = {
      app: {
        get: sinon.spy()
      }
    }
    const res = {
      locals: {
        message: '',
        error: ''
      },
      status: sinon.spy(),
      render: sinon.spy()
    }
    const next = sinon.spy()

    app.__get__('errorHandler')(err, req, res, next)

    assert.strictEqual(res.locals.message, 'test message')
    assert.notStrictEqual(res.locals.error, {})
    assert.ok(res.render.withArgs('error').calledOnce)
    assert.ok(res.status.withArgs(404).calledOnce)

    done()
  })

  it('Call error handler with 404 error', (done) => {
    const err = {
      message: 'test message',
      status: null
    }
    const req = {
      app: {
        get: sinon.spy()
      }
    }
    const res = {
      locals: {
        message: '',
        error: ''
      },
      status: sinon.spy(),
      render: sinon.spy()
    }
    const next = sinon.spy()

    app.__get__('errorHandler')(err, req, res, next)

    assert.strictEqual(res.locals.message, 'test message')
    assert.notStrictEqual(res.locals.error, {})
    assert.ok(res.render.withArgs('error').calledOnce)
    assert.ok(res.status.withArgs(500).calledOnce)

    done()
  })
})
