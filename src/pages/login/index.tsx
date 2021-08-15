import firebase from 'firebase'
import { useCallback, useContext } from 'react'

import FacebookLogo from '@/assets/images/facebook.svg'
import GoogleLogo from '@/assets/images/google.svg'
import { FirebaseContext } from '@/context/firebase'
import notify from '@/utils/notify'

const Login = () => {
  const { auth } = useContext(FirebaseContext)
  const loginWithGoogle = useCallback(async () => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider()
      await auth.signInWithPopup(provider).then(() => {
        notify.success('Login successfully!')
      })
    } catch (error) {
      console.log(error)
    }
  }, [auth])
  const loginWithFacebook = () => {
    console.log('hieu')
  }
  return (
    <div className="w-screen h-screen flex items-center justify-center lg:justify-start lg:pl-16 bg-login bg-no-repeat bg-right-bottom bg-contain bg-login-color">
      <div className="flex justify-center items-center flex-col min-w-max mb-8">
        <h1 className="font-bold mb-8 uppercase text-3xl text-white font-georama">
          Kakeibo login
        </h1>
        <button
          type="button"
          className="btn-danger min-w-full md:btn-large rounded-full flex items-center"
          onClick={loginWithGoogle}
        >
          <img src={GoogleLogo} alt="" width={24} />
          <span className="ml-4">Log in with Google</span>
        </button>
        <button
          type="button"
          className="btn-primary min-w-max md:btn-large rounded-full flex items-center mt-4"
          onClick={loginWithFacebook}
        >
          <img src={FacebookLogo} alt="" width={24} />
          <span className="ml-4">Log in with Facebook</span>
        </button>
      </div>
    </div>
  )
}

export default Login
