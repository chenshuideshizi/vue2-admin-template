import axios from 'axios'
import store from '../../vuex/'
import { stringify } from 'qs'
import { extend } from '@/plugins/utils/'

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
export function fetch (url, opt = {}) {
  let params = opt.params || {}
  let data = opt.data || {}

  let fetchFlag = false

  const userInfo = store.state.userInfo
  const appHeader = {
    deviceId: userInfo.deviceId,
    memberId: userInfo.memberId,
    token: userInfo.token,
    platform: 'h5',
    timestamp: new Date().getTime(),
    versionCode: userInfo.versionCode,
    versionName: userInfo.versionName,
    model: {}
  }

  if (opt.appSet) {
    params = extend(true, {}, appHeader)
    data = extend(true, {}, appHeader)
    extend(true, params.model, opt.params)
    extend(true, data.model, opt.data)
  }


  return new Promise((resolve, reject) => {
    axios({
      method: opt.type || 'get',
      url: url,
      params: fetchFlag ? null : (opt.appSet ? { data: JSON.stringify(params) } : params),
      // 判断是否有自定义头部，以对参数进行序列化。不定义头部，默认对参数序列化为查询字符串。
      data: data,
      responseType: opt.dataType || 'json',
      headers: opt.headers || {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
    })
      .then(response => {
        if (response.data.code === 0 || response.data.success || response.data.code === '200' || response.data.code === '1' || !response.data.code) {
          resolve(response.data)
        } else {
          reject(response.data)
          store.commit('SET_LOADING', false)
        }
      })
      .catch(error => {
        console.log(error)
        reject(error)
        store.commit('SET_LOADING', false)
      })
  })
}

export default axios