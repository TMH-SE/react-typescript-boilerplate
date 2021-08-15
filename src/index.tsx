import ReactDOM from 'react-dom'
import { setConfig } from 'react-hot-loader'

import App from '@/App'

setConfig({
  showReactDomPatchNotification: false
})

ReactDOM.render(<App />, document.querySelector('#root'))
