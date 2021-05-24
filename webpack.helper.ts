import * as fs from 'fs'
import * as path from 'path'

const moduleFileExtensions = ['ts', 'tsx']

const appDirectory = fs.realpathSync(process.cwd())

const resolvePath = (relativePath: string): string =>
  path.resolve(appDirectory, relativePath)

const resolveModule = (
  resolveFn: (arg: string) => string,
  filePath: string
): string => {
  const extension = moduleFileExtensions.find(extension =>
    fs.existsSync(resolveFn(`${filePath}.${extension}`))
  )

  if (extension) {
    return resolveFn(`${filePath}.${extension}`)
  }

  return resolveFn(`${filePath}.js`)
}

const alias = {
  '@app': resolvePath('src/app'),
  '@assets': resolvePath('src/assets'),
  '@components': resolvePath('src/components'),
  '@constants': resolvePath('src/constants'),
  '@layouts': resolvePath('src/layouts'),
  '@pages': resolvePath('src/pages'),
  '@routers': resolvePath('src/routers'),
  '@utils': resolvePath('src/utils'),
  '@style': resolvePath('src/style')
}

export { resolvePath, resolveModule, alias }
