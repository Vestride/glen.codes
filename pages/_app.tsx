import { AppProps } from 'next/app';

import 'dracula-prism/css/dracula-prism.css';
import '../styles/index.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
