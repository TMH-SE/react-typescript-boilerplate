import { FC, useMemo } from 'react'
import { toast, ToastOptions } from 'react-toastify'

import ErrorIcon from '@/assets/images/error.svg'
import InfoIcon from '@/assets/images/info.svg'
import SuccessIcon from '@/assets/images/success.svg'
import WarningIcon from '@/assets/images/warning.svg'

interface ToastContentProps {
  title: string
  type: 'info' | 'success' | 'warning' | 'error'
}

const toastOptions: ToastOptions = {
  position: 'bottom-right',
}

const ToastContent: FC<ToastContentProps> = ({ title, type }) => {
  const Icon = useMemo(() => {
    switch (type) {
      case 'info':
        return InfoIcon
      case 'success':
        return SuccessIcon
      case 'warning':
        return WarningIcon
      case 'error':
        return ErrorIcon
      default:
        return null
    }
  }, [type])
  return (
    <div className="flex items-center">
      <img src={Icon} alt="success" className="mr-4" width={24} height={24} />
      {title}
    </div>
  )
}

const notify = {
  success(title: string) {
    toast.success(<ToastContent title={title} type="success" />, toastOptions)
  },
  info(title: string) {
    toast.info(<ToastContent title={title} type="info" />, toastOptions)
  },
  warning(title: string) {
    toast.warning(<ToastContent title={title} type="warning" />, toastOptions)
  },
  error(title: string) {
    toast.error(<ToastContent title={title} type="error" />, toastOptions)
  },
}

export default notify
