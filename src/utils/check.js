/*
 * @Description: 组件信息描述
 * @version: 2.1.0
 * @Author: MR·小涛
 * @Date: 2020-06-29 09:53:43
 * @LastEditors: MR·小涛
 * @LastEditTime: 2020-07-07 11:44:08
 */
/**
 * 存放验证类的JS库
 */
/**
 * 验证是不是对象
 * @param {*} content 需要被验证的值
 */
export function isObject (content) {
  return Object.prototype.toString.call(content) === '[object Object]'
}
/**
 * @param {type} message 需要提示的信息内容
 */
export const checkNullValue = (message, checkArr = false) => {
  if (checkArr) {
    return (rule, value, callback) => {
      if (!value.length) {
        return callback(new Error(message))
      } else {
        callback()
      }
    }
  } else {
    return (rule, value, callback) => {
      if (typeof value === 'number') {
        if (value === '' || value === undefined || value === null) {
          return callback(new Error(message))
        } else {
          callback()
        }
      } else {
        if (!value) {
          return callback(new Error(message))
        } else {
          callback()
        }
      }
    }
  }
}
/**
 * 验证URL 读取那个文件
 */
export function checkBaseUrl () {
  // 是否是开发环境
  if (process.env.NODE_ENV === 'production') {
    // 如果需要读取配置文件的接口地址
    if (window.isStartServerConfig) {
      return window.serverConfig.server_url
    } else {
      // 直接读取项目内的地址   .env.production
      return process.env.VUE_APP_server_url
    }
  } else {
    // 开发环境读取  .env.development 配置
    return process.env.VUE_APP_server_url
  }
}
/**
 * 读取配置文件信息
 */
window.serverConfig = readConfig()
export function readConfig () {
  if (process.env.NODE_ENV === 'production') {
    // 如果需要读取配置文件的接口地址
    if (window.isStartServerConfig) {
      return window.serverConfig
    } else {
      return createResult()
    }
  } else {
    return createResult()
  }
}
function createResult () {
  const result = {}
  for (const k in process.env) {
    if (k.startsWith('VUE_APP_')) {
      const [, key] = k.split('VUE_APP_')
      result[key] = process.env[k]
    }
  }
  return result
}
