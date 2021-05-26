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
  '@': resolvePath('src')
}

export { resolvePath, resolveModule, alias }
