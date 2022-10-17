import React from 'react';
import Document, {DocumentContext, DocumentInitialProps, Html, Head, Main, NextScript } from 'next/document'
import { CssBaseline } from '@nextui-org/react'; //Configuración para NextUI

//Este archivo se genera para poder modificar la plantilla del HTML
class MyDocument extends Document {
  static async getInitialProps( ctx: DocumentContext): Promise<DocumentInitialProps> {
    
    // Run the parent `getInitialProps`, it now includes the custom `renderPage`
    const initialProps = await Document.getInitialProps(ctx)

    return {
        ...initialProps,
        styles: React.Children.toArray([initialProps.styles])
      };
    
  }

  render() {
    return (
      <Html>
        <Head>{CssBaseline.flush()}</Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument