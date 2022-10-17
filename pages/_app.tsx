import type { AppProps } from 'next/app'

import { NextUIProvider } from '@nextui-org/react';

import '../styles/globals.css'
import { darkTheme } from '../themes/darktheme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    //El theme luego lo podemos cambiar de manera dinámica.
  <NextUIProvider theme={darkTheme}> 
    <Component {...pageProps} />
  </NextUIProvider>
  )
}

export default MyApp
