import Head from 'next/head';
import { HOME_OG_IMAGE_URL } from '../lib/constants';

export const Meta = () => {
  return (
    <Head>
      <title>Glen Codes</title>
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#3498db" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <meta name="msapplication-TileColor" content="#3498db" />
      <meta name="msapplication-config" content="/browserconfig.xml" />
      <meta name="theme-color" content="#3498db" />
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      <meta name="description" content="Glen Cheney’s development blog." />
      <meta property="og:image" content={HOME_OG_IMAGE_URL} />
    </Head>
  );
};
