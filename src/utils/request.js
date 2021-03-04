import axios from 'axios'
import { message, Modal } from 'ant-design-vue'
import store from '@/store'
import { getToken } from '@/utils/auth'

const service = axios.create({
  // process.env是从当前env中获取 // 在vue-cli中，可以在项目根目录设置`.env.xxx`来设置这个参数值
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

/**
 * 全局request拦截器
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
    console.log(error)
    return Promise.reject(error)
  }
)

/**
 * 全局response拦截器
 */
service.interceptors.response.use(
  response => {
    const res = response.data

    // 对特殊响应格式的处理，比如OAuth响应或者流文件响应
    if (!(res instanceof Object) || res.code === undefined) {
      return res
    }

    // 针对Security OAuth异常做特殊处理
    if (response.status === 401 || response.status === 403) {
      Modal.warning({
        title: 'Confirm logout',
        content: 'Token已失效，请重新登录',
        okText: '重新登录',
        cancelText: 'Cancel',
        onOk: () => {
          store.dispatch('user/logoutSession')
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
    console.log(error.response)

    const data = error.response.data
    if (data instanceof Object) {
      message.error(data.msg ? data.msg : data.message ? data.message : '网络连接异常，请稍后重试', 4)
    } else {
      message.error('网络连接异常，请稍后重试')
    }
    return Promise.reject(error)
  }
)

export default service
