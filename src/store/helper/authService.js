import {
  ACCESS_TOKEN,
  LOCALIZATION,
  REFRESH_TOKEN
} from 'common/config/app.constants'
import { getAuth, GoogleAuthProvider, signOut } from 'firebase/auth'

class AuthService {
  handleAuthentication = () => {
    const accessToken = this.getAccessToken()
    if (!accessToken || !this.isValidToken(accessToken)) return
    this.setSession(ACCESS_TOKEN, accessToken)
  }

  loginWithToken = async () => {
    return {
      user: ''
    }
  }

  setSession = (key, accessToken) => {
    localStorage.setItem(key, accessToken)
  }

  logOut = () => {
    const auth = getAuth()
    localStorage.clear()
    signOut(auth)
  }

  getAccessToken = () =>
    typeof window !== 'undefined' && localStorage.getItem(ACCESS_TOKEN)

  getRefreshToken = () =>
    typeof window !== 'undefined' && localStorage.getItem(REFRESH_TOKEN)

  getLocalization = () =>
    typeof window !== 'undefined' && localStorage.getItem(LOCALIZATION)

  isAuthenticated = () => !!this.getAccessToken()

  isValidToken = (accessToken) => {
    const expireTime = 1606275140.897
    if (!accessToken) return false
    const currentTime = Date.now() / 1000
    return expireTime < currentTime
  }
}

export const authService = new AuthService()
