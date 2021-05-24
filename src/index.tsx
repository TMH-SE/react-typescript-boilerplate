import App from '@app'
import ReactDOM from 'react-dom'
import { setConfig } from 'react-hot-loader'
import { hot } from 'react-hot-loader/root'

const Main = hot(App)

setConfig({
  showReactDomPatchNotification: false
})

ReactDOM.render(<Main />, document.querySelector('#root'))
