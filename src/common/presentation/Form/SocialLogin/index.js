import { Divider } from 'common/presentation/Divider'
import XProfileIcon from 'common/presentation/Icons'
import { Fragment } from 'react'
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider
} from 'firebase/auth'
import { useLinkedIn } from 'react-linkedin-login-oauth2'
import { useDispatch } from 'react-redux'
import { getTokenByFirebase, loginByToken } from 'store/app/authSlice'

const SocialLogin = () => {
  const dispatch = useDispatch()
  const handleLoginGoogle = () => {
    const provider = new GoogleAuthProvider()
    // provider.addScope('https://www.googleapis.com/auth/contacts.readonly')
    provider.setCustomParameters({ prompt: 'select_account' })

    const auth = getAuth()
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const response = await dispatch(
          getTokenByFirebase({ firebaseToken: result._tokenResponse.idToken })
        )
        if (response.payload.token) {
          dispatch(loginByToken({ token: response.payload.token }))
        }

        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result)
      })
      .catch((error) => {
        console.log('error: ', error)
        const credential = GoogleAuthProvider.credentialFromError(error)
      })
  }

  const handleLoginFacebook = () => {
    const provider = new FacebookAuthProvider()
    provider.addScope('public_profile')
    provider.addScope('email')
    provider.setCustomParameters({
      display: 'popup'
    })
    const auth = getAuth()
    auth.languageCode = 'it'
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const response = await dispatch(
          getTokenByFirebase({ firebaseToken: result._tokenResponse.idToken })
        )
        if (response.payload.token) {
          dispatch(loginByToken({ token: response.payload.token }))
        }
        const credential = FacebookAuthProvider.credentialFromResult(result)
      })
      .catch((error) => {
        console.log('error: ', error)
        const credential = FacebookAuthProvider.credentialFromError(error)
      })
  }

  const { linkedInLogin } = useLinkedIn({
    clientId: '78zc7sv4o7xey5',
    redirectUri: `${
      typeof window === 'object' && window.location.origin
    }/linkedin`, // for Next.js, you can use `${typeof window === 'object' && window.location.origin}/linkedin`
    onSuccess: (code) => {
      console.log('success: ', code)
    },
    onError: (error) => {
      console.log('error: ', error)
    }
  })

  return (
    <Fragment>
      <div className="flex gap-[16px] items-center mb-[18px]">
        <Divider />
        <p>hoặc</p>
        <Divider />
      </div>
      <div className="flex gap-[44px] items-center w-fit mx-auto">
        <div
          className="cursor-pointer hover:opacity-80"
          onClick={handleLoginFacebook}
        >
          <XProfileIcon name="facebook" />
        </div>
        {/* <div
          className="cursor-pointer hover:opacity-80"
          onClick={linkedInLogin}
        >
          <XProfileIcon name="linkedIn" />
        </div> */}
        <div
          className="cursor-pointer hover:opacity-80"
          onClick={handleLoginGoogle}
        >
          <XProfileIcon name="google" />
        </div>
      </div>
    </Fragment>
  )
}

export default SocialLogin
