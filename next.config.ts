import type { NextConfig } from 'next'
import path from 'path'

const config: NextConfig = {
  serverExternalPackages: ['jszip'],
  turbopack: {
    root: path.resolve(process.cwd()),
  },
}
export default config
