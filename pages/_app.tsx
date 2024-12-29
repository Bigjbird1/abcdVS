import type { AppProps } from 'next/app'
import { useEffect } from 'react'

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Ignore the asm.js warning
    const originalConsoleWarn = console.warn
    console.warn = (...args) => {
      if (args[0] && typeof args[0] === 'string' && args[0].includes('Invalid asm.js: Undefined global variable')) {
        return
      }
      originalConsoleWarn.apply(console, args)
    }

    return () => {
      console.warn = originalConsoleWarn
    }
  }, [])

  return <Component {...pageProps} />
}

export default MyApp

