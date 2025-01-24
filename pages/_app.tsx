import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { AuthProvider } from '@/context/AuthContext'

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const originalConsoleWarn = console.warn
    console.warn = (...args) => {
      if (args[0]?.includes('Invalid asm.js: Undefined global variable')) return
      originalConsoleWarn.apply(console, args)
    }
    return () => {
      console.warn = originalConsoleWarn
    }
  }, [])

  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp