import { FC } from 'react'
import { hot } from 'react-hot-loader/root'

import AuthProvider from '@/context/auth'
import AppRouter from '@/router'

import 'style/app'

const App: FC = () => (
  <AuthProvider>
    <AppRouter />
  </AuthProvider>
)

export default hot(App)
