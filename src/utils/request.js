import axios from 'axios'
import { Modal, message } from 'ant-design-vue'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  // process.env是从当前env中获取 // 在vue-cli中，可以在项目根目录设置`.env.xxx`来设置这个参数值
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

/**
 * 全局request拦截器
 * 作用：当发送请求时，首先要经过此拦截器
 *    判断当前Token是否失效，没失效就每次都添加到request header上，保证每次request，请求头都携带Token
 */
service.interceptors.request.use(
  config => {
    // 在请求之前拦截，判断store中是否存储了token
    if (store.getters.token) {
      // 如果存储了token，就将token设置在request header中，保证每次发送request，header中都包含token
      config.headers['Authorization'] = 'Bearer ' + getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

/**
 * 全局response拦截器
 * 作用：当request结束后，后端response首先经过此拦截器
 *    全局封装请求响应数据
 *    全局判断请求是否成功（1.请求失败走error方法；2.请求成功但后端发生错误走success方法）
 *    根据请求是否成功全局展示message。请求成功则继续判断code，不同状态的code再进行相应逻辑处理
 */
service.interceptors.response.use(
  /**
   *  response format：
   *  {
   *    "code": "200",
   *    "data": {},
   *    "msg": "success"
   *  }
   *  如果response format不是上述，请自行修改下方：`res.code`、`res.data`、`res.msg`
   */
  response => {
    const res = response.data

    /**
     * 对特殊响应格式的处理，比如OAuth响应或者流文件响应
     */
    if (!(res instanceof Object) || res.code === undefined) {
      return res
    }

    // 针对Security OAuth异常做特殊处理
    if (response.status === 401 || response.status === 403) {
      // 重新登录
      Modal.warning({
        title: 'Confirm logout',
        content: 'Token已失效，请重新登录',
        okText: 'Re-Login',
        cancelText: 'Cancel',
        onOk: () => {
          store.dispatch('user/logout').then(() => {
            location.reload()
          })
        }
      })
    }

    // 根据response code判断请求是否成功
    if (res.code !== 200) {
      message.error(
        res.msg || 'Error',
        4
      )
      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      return res
    }
  },
  error => {
    const res = error.response
    console.log(res) // for debug
    message.error(res.data.msg ? res.data.msg : res.data.message, 4)
    // if (res.status === 401 || res.status === 403) {
    //   store.dispatch('user/logout').then(() => {
    //     location.reload()
    //   })
    // }
    return Promise.reject(error)
  }
)

export default service
