import axios from 'axios'
import cookie from 'js-cookie'
// create an axios instance
const service = axios.create({
  baseURL: 'http://localhost:9001', // url = base url + request url
  timeout: 5000 // request timeout
})

// http request 拦截器
service.interceptors.request.use(
  config => {
    const token = cookie.get('guli_token')
    if (token) {
      config.headers['token'] = token
    }
    return config
  },
  err => {
    return Promise.reject(err)
  })

export default service
