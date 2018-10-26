module.exports = {
  success: (response) => {
    return {
      code: 100,
      msg: 'success',
      response: response
    }
  },
  fail: (response) => {
    return {
      code: 999,
      msg: 'fail',
      response: response
    }
  },
  other: (response, options) => {
    options.response = response
    return options
  }
}
