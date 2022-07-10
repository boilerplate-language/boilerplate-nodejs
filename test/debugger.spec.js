const { debug, info, warn, error } = require('../routes/debugger')

describe('debugger', () => {
  it('debug method', async () => {
    debug('test message')
  })

  it('info method', async () => {
    info('test message')
  })

  it('warn method', async () => {
    warn('test message')
  })

  it('error method', async () => {
    error('test message')
  })
})
