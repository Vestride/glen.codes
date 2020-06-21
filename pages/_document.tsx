import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
          {process.env.NODE_ENV === 'production' && <script async src="https://glencodes.disqus.com/embed.js"></script>}
        </body>
      </Html>
    );
  }
}
