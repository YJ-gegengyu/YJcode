import axios from 'axios'
import { isObject, checkBaseUrl } from '@/utils/check'
// import store from '@/store/index'
// import Vue from 'vue'
// import {
//   Loading
// } from 'element-ui'
// 设置Url参数MD5 参数匹配
/**
 *
 * @param {请求的JSON参数} params
 * @param {是否是Get请求} isGet
 */
// 查看属性类型
/**
 *
 * @param {*} o被检测的值
 */
class AjaxRequest {
  constructor() {
    // 接口请求路径
    this.baseURL = process.env.NODE_ENV !== 'production' ? checkBaseUrl() : `${checkBaseUrl()}/audit`
    //  超时时间
    this.timeout = 1000 * 60 * 3
    // 是否返回请求头信息
    this.isReturnHeader = false
    // 是否是流的方式请求
    this.responseType = null
    // 定义公用数据对象
    this.commonParams = {
      // isNoReferrer: true,
      // version: 1,
      // 请求地址
      serverPort: this.baseURL
      // 时间戳
      // timestamp: (new Date()).valueOf()
      // 是否是手机端
      // isMobile: false,
      // 当前年度
      // inYear: '',
      // 当前账套ID
      // inZtId: ''
    }
    // 自定义配置
    this.customConfig = {
      showLoading: true
    }
    // 存储请求Url
    this.queue = {}
    // const { year, ztId } = store ? store.state.authInfoData : ''
    // 保存infoData到数据
    // store.commit('SET_INFO_DATA', store.state.authInfoData)
    // this.commonParams.inYear = year
    // this.commonParams.inZtId = ztId
    // 定义请求头信息
    this.headers = {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json; charset=UTF-8'
      // Authorization: store ? store.state.token : '',
      // token: store ? store.state.token : '',
      // authEncryptKey: null
      // mtoken: store ? store.state.mTokenGetUID : '',
      // msign: store ? store.state.mTokenReadSecureStorage : '',
      // 被审计单位id
      // auditOrgID: store ? store.state.projectData.auditZtID : '',
      // 项目id
      // currentProjectID: store ? store.state.projectData.id : '',
      // 计划id
      // currentProgramID: store ? store.state.projectData.programID : '',
      // 菜单id
      // currentMenuID: store ? store.state.menuID : '',
      // 账id
      // currentASID: store ? store.state.asid : ''
    }
  }

  /**
   *
   * @param {*} instance axios实例
   * @param {*} url 请求路径
   */

  //   创建请求核心实例
  request(options, isReturnHeader) {
    // 创建axios实例
    const instance = axios.create()
    // 当前baseUrl 如果不是HTTP开头 那么需要拼接请求路径
    if (!options.baseURL.startsWith('http')) {
      // 解析出当前的URL地址
      const { origin } = new URL(this.baseURL)
      // 拼接URL地址
      options.baseURL = `${origin}${options.baseURL}`
    }
    // 合并配置文件
    const config = {
      // baseURL: this.baseURL,
      timeout: this.timeout,
      headers: this.headers,
      responseType: this.responseType,
      ...options
    }

    // this.setInterceptor(instance, options.url, isReturnHeader)
    // 返回一个promise实例
    return instance(config)
  }

  /**
 *
 * @param {*} method 请求的方法
 * @param {*} options 请求传递的配置项   字符串和对象值不同
 * @param {*} data  需要携带的参数
 * @param {*} isUpload  是否是图片上传
 */
  setOptions(method, options, data, isUpload = false) {
    // 如果options 是一个对象
    const flag = isObject(options)
    // 重新获取时间戳
    this.commonParams.timestamp = (new Date()).valueOf()
    return {
      // 处理统一请求路径
      baseURL: options.baseURL || this.baseURL,
      // 如果当前options是一个对象那么传入 options的url
      url: flag ? options.url : options,
      method,
      params: method === 'get' || method === 'delete' ? { ...this.commonParams, ...data } : {},
      data: method === 'post' || method === 'delete' ? (isUpload ? data : { ...this.commonParams, ...data }) : {}
    }
  }

  /**
 *
 * @param {Object|string} options 请求配置项  可以传入一个对象 也可以传入一个字符串
 * @param {Object} params 如果options 是字符串那么 启用params
 */
  get(options, params = {}, config = { showLoading: true }) {
    this.responseType = null
    this.headers['Content-Type'] = 'application/json; charset=UTF-8'
    options = this.setOptions('get', options, params)
    // 设置请求key
    // this.headers.authEncryptKey = this.setParams(params, false, options.url)
    this.customConfig = config
    // 发送请求
    return this.request(options, false)
  }

  /**
   *
   *
   * @param  {Object|string} options请求配置项  可以传入一个对象 也可以传入一个字符串
   * @param {*} data post 传输的数据
   * @returns
   * @memberof AjaxRequest
   */
  post(options, data, config = { showLoading: true }) {
    this.responseType = null
    this.headers['Content-Type'] = 'application/json; charset=UTF-8'
    options = this.setOptions('post', options, data)
    // this.headers.authEncryptKey = this.setParams(data, false, options.url)
    this.customConfig = config
    // 发送请求
    return this.request(options, false)
  }

  /**
   * @param  {Object|string} options请求配置项  可以传入一个对象 也可以传入一个字符串
   * @param {*} data put 传输的数据
   * @returns
   * @memberof AjaxRequest
   */
  put(options, data, config = { showLoading: true }) {
    this.customConfig = config
    this.responseType = null
    this.headers['Content-Type'] = 'application/json; charset=UTF-8'
    // 判断传入的是不是一个对象
    const flag = isObject(options)
    // 如果传入的不是一个对象那么需要吧当前传入的值进行格式化 在返回出来
    options = !flag && this.setOptions('post', options, data)
    // // 设定死 请求方法为post
    options.method = 'put'
    // 设置请求key
    // this.headers.authEncryptKey = this.setParams(data, false, options.url)
    // 发送请求
    return this.request(options, false)
  }

  /**
   *
   * @param {*} options 配置项
   * @param {*} data 数据
   */
  delete(options, data, config = { showLoading: true }) {
    this.customConfig = config
    this.responseType = null
    // 判断传入的是不是一个对象
    const flag = isObject(options)
    // 如果传入的不是一个对象那么需要吧当前传入的值进行格式化 在返回出来
    options = !flag && this.setOptions('delete', options, data)
    this.headers['Content-Type'] = 'application/json; charset=UTF-8'
    // // 设定死 请求方法为post
    options.method = 'delete'
    // 设置请求key
    // this.headers.authEncryptKey = this.setParams(data, false, options.url)
    // 发送请求
    return this.request(options, false)
  }

  // 下载文件
  /**
   *
   *
   * @param {Object|string}  options 请求配置项  可以传入一个对象 也可以传入一个字符串
   * @param {object} params 如果options 是字符串那么 启用params
   * @returns axios 实例
   * @memberof AjaxRequest
   */
  getFile(options, params, config = { showLoading: true }) {
    this.customConfig = config
    // 设置为文件流的下载
    this.responseType = 'blob'
    // 如果传入的不是一个对象那么需要吧当前传入的值进行格式化 在返回出来
    options = this.setOptions('get', options, params)
    // // 设定死 请求方法为post
    options.method = 'get'
    // 设置请求key
    // this.headers.authEncryptKey = this.setParams(params, true, options.url)
    // 发送请求
    return this.request(options, true)
  }

  // 下载文件2
  /**
   *
   * @param {Object|string}  options 请求配置项  可以传入一个对象 也可以传入一个字符串
   * @param {object} params 如果options 是字符串那么 启用params
   * @returns axios 实例
   * @memberof AjaxRequest
   */
  postFile(options, params, config = { showLoading: true }) {
    this.customConfig = config
    // 设置为文件流的下载
    this.responseType = 'blob'
    // 如果传入的不是一个对象那么需要吧当前传入的值进行格式化 在返回出来
    options = this.setOptions('post', options, params)
    // // 设定死 请求方法为post
    options.method = 'post'
    // 设置请求key
    // this.headers.authEncryptKey = this.setParams(params, true, options.url)
    // 发送请求
    return this.request(options, true)
  }

  // 上传图片
  upLoadFile(options, data, config = { showLoading: true }) {
    this.customConfig = config
    this.responseType = null
    // 判断传入的是不是一个对象
    this.headers['Content-Type'] = 'multipart/form-data'
    const flag = isObject(options)
    // 如果传入的不是一个对象那么需要吧当前传入的值进行格式化 在返回出来
    options = !flag && this.setOptions('post', options, data, true)
    // // 设定死 请求方法为post
    options.method = 'post'
    // 设置请求key
    // this.headers.authEncryptKey = this.setParams(data, false, options.url)
    // 发送请求
    return this.request(options, false)
  }
}
export default new AjaxRequest()
