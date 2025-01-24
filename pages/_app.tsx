import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { AuthProvider } from '@/components/AuthProvider';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const originalConsoleWarn = console.warn;
    console.warn = (...args: any[]) => {
      if (args[0]?.includes('Invalid asm.js: Undefined global variable')) return;
      originalConsoleWarn.apply(console, args);
    };

    return () => {
      console.warn = originalConsoleWarn;
    };
  }, []);

  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;