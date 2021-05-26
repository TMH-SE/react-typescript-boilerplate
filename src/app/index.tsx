import AuthProvider from 'provider/auth.provider'
import { FC } from 'react'

import AppRouter from '@/router'

import 'style/app'

const App: FC = () => (
  <AuthProvider>
    <AppRouter />
  </AuthProvider>
)

export default App
