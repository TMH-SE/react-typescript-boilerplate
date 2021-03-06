import ReactDOM from 'react-dom'
import { setConfig } from 'react-hot-loader'
import { hot } from 'react-hot-loader/root'

import App from '@/app'

const Main = hot(App)

setConfig({
  showReactDomPatchNotification: false
})

ReactDOM.render(<Main />, document.querySelector('#root'))
