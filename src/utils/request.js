import axios from 'axios'
import { stringify } from 'qs'

axios.defaults.timeout = 8000

axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 404: console.log('请求404'); break
        case 500: console.log('请求500'); break
      }
    }
    return Promise.reject({ code: '-100', message: '网络异常请稍后再试！' })
  }
)


// 封装请求
export const request =  (options = {}) => {
  debugger
  const {url, data = {}, params = {}, method = 'POST'} = options
  const p = new Promise((resolve, reject) => {
    axios({
      method,
      url,
      params,
      data
    })
      .then(response => {
        if (response.data.code === 0 || response.data.code === '200') {
          resolve(response.data)
        } else {
          reject(response.data)
        }
      })
      .catch(error => {
        reject(error)
      })
  })

  return p.then(data => [data, null]).catch(err => [null, err])
}