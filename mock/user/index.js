const Mock = require('mockjs')
module.exports = (app) => {
  
}
const tokens = {
  admin: 'admin-token',
  work: 'work-token'
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  'work-token': {
    roles: ['editor'],
    introduction: 'I am an worker',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Workder'
  }
}

Mock.mock('/api/login', config => {
  const { username } = config.body
  const token = tokens[username]

  if (!token) {
    return {
      code: 60204,
      message: '用户名或密码错误',
      data: {}
    }
  }

  return {
    code: 2000,
    message: '登录成功',
    data: {
      token
    }
  }
})

Mock.mock('/api/logout', config => {
  return {
    code: 2000,
    message:  '退出登录成功',
    data: {}
  }
})

Mock.mock('/api/user/info', (config) =>  {
  const { token } = config.headers
  const info = users[token]

  if (!info) {
    return {
      code: 50008,
      message: 'token已失效，请重新登录'
    }
  }

  return {
    code: 2000,
    data: info
  }
})
