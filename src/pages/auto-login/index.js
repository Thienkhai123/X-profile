import { ACCESS_TOKEN } from 'common/config/app.constants'
import { useEffect } from 'react'

const AutoLoginPage = () => {
  useEffect(() => {
    let params = new URLSearchParams(document.location.search)
    let tokenRedirect = params.get('token')
    if (tokenRedirect) {
      localStorage.setItem(ACCESS_TOKEN, tokenRedirect)
      window.location.replace('/')
    } else {
      window.location.replace('/404')
    }
  }, [])
  return <div></div>
}

export default AutoLoginPage
