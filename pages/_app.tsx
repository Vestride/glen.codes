import { useEffect } from 'react';
import { AppProps } from 'next/app';
import Router from 'next/router';

import { sendPageview } from '../lib/analytics';

import 'dracula-prism/css/dracula-prism.css';
import '../styles/index.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    sendPageview();
    Router.events.on('routeChangeComplete', sendPageview);
    return () => {
      Router.events.off('routeChangeComplete', sendPageview);
    };
  }, []);

  return <Component {...pageProps} />;
}
