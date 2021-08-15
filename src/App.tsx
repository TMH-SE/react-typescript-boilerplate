import { FC } from 'react'
import { hot } from 'react-hot-loader/root'
import { ToastContainer } from 'react-toastify'

import AuthProvider from '@/context/auth'
import FirebaseProvider from '@/context/firebase'
import AppRouter from '@/router'

import 'style/app'

const App: FC = () => (
  <FirebaseProvider>
    <AuthProvider>
      <AppRouter />
      <ToastContainer />
    </AuthProvider>
  </FirebaseProvider>
)

export default hot(App)
