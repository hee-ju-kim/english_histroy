let config

switch (process.env.NODE_ENV) {
  // env 분기처리할거 생기면 여기 추가
  case 'hj':
    config = require('./hj').config
    break
  default:
    config = require('./hj').config
    break
}

export default () => {
  return config
};