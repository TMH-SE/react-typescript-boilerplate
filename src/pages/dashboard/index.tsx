import { FC, useCallback, useContext } from 'react'

import { LocalStorageItemKeys } from '@/constants/app'
import { AuthContext } from '@/context/auth'

const Dashboard: FC = () => {
  const { dispatchAuthAction } = useContext(AuthContext)
  const handleLogout = useCallback(() => {
    localStorage.setItem(LocalStorageItemKeys.ACCESS_TOKEN, 'hello-world')
    dispatchAuthAction({
      type: 'RESET_AUTH_CONTEXT',
    })
  }, [dispatchAuthAction])
  return (
    <figure className="md:flex bg-gray-100 rounded-xl p-8 md:p-0">
      <img
        className="w-32 h-32 md:w-48 md:h-auto md:rounded-none rounded-full mx-auto"
        src="https://tailwindcss.com/_next/static/media/sarah-dayan.a8ff3f1095a58085a82e3bb6aab12eb2.jpg"
        alt=""
        width="384"
        height="512"
      />
      <div className="pt-6 md:p-8 text-center md:text-left space-y-4">
        <blockquote>
          <p className="text-lg font-semibold">
            “Tailwind CSS is the only framework that I&apos;ve seen scale on large
            teams. It’s easy to customize, adapts to any design, and the build
            size is tiny.”
          </p>
        </blockquote>
        <figcaption className="font-medium">
          <div className="text-cyan-600">Sarah Dayan</div>
          <div className="text-gray-500">Staff Engineer, Algolia</div>
        </figcaption>
      </div>
    </figure>
  )
}

export default Dashboard
