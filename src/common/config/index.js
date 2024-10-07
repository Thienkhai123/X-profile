import { apiEndpoint } from './api.endpoint'
import PAGE_CONFIG from 'common/config/app.router'

function appSettings() {
  // window.globalData = window.globalData || {}
  // window.globalData.appSettings = window.globalData.appSettings || {}
  // /**
  //  * @type {{[x:string]:any}}
  //  */
  // const configGlobal = window.globalData.appSettings

  const config = {
    NODE_ENV: process.env.ENV,
    __DEV__: process.env.ENV === 'development',
    urlAPI: process.env.NEXT_PUBLIC_API_HOST
    // ...configGlobal
  }
  const page = { ...PAGE_CONFIG }
  const api = {
    ...apiEndpoint(config.urlAPI)
  }
  return { config, api, page }
}

const { api, config, page } = appSettings()

export { api, config, page }
