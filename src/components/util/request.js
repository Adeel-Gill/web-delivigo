import axios from 'axios'
import {EventBus} from "../../main";
// import {Message} from 'element-ui'
// import {store} from 'store'
// import {getToken} from 'auth'

// create an axios instance
export const service = axios.create({
  baseURL: 'https://www.foodizza.com/api/', // Api base_url
  timeout: 50000, // request timeout
})

// service.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
// request interceptor
service.interceptors.request.use(config => {
  // Do something before request is sent
  // if (store.getters.token) {
  //   config.headers['Authorization'] = getToken()
  // }*
  EventBus.$emit('StartOverlay', true);
  return config
}, error => {
  // Do something with request error
  EventBus.$emit('StartOverlay', false);
  console.log(error) // for debug
  Promise.reject(error)
})

// respone interceptor

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    //
    // if (store.getters.token) {
    //   // let each request carry token
    //   // ['X-Token'] is a custom headers key
    //   // please modify it according to the actual situation
    //   config.headers['X-Token'] = getToken()
    // }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    EventBus.$emit('StartOverlay', false);
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    console.log('response',response)
    const res = response
    EventBus.$emit('StartOverlay', false);
    // if the custom code is not 200, it is judged as an error.
    if (res.status != 200) {
      // Message({
      //   message: res.message || 'Error',
      //   type: 'error',
      //   duration: 5 * 1000
      // })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.status === 50008 || res.status === 50012 || res.status === 50014) {
        // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res.data;
    }
  },
  error => {
    console.log('err' + error) // for debug
    EventBus.$emit('StartOverlay', false);
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
