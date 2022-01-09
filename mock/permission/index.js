const Mock = require('mockjs')

module.exports = [
  // 获取所有有权限的路由
  {
    url: '/api/permision',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: {
          menu_code: ['HOME', 'ABOUT']
        }
      }
    }
  }
]
