import { Header } from './header';
import { Footer } from './footer';
import { Meta } from './meta';

export const Layout: React.FunctionComponent = ({ children }) => (
  <div className="flex flex-col min-h-screen">
    <Meta />
    <Header />
    <main className="flex-1 m-y-8 overflow-hidden">{children}</main>
    <Footer />
    <script async src="https://www.google-analytics.com/analytics.js"></script>
    <script
      dangerouslySetInnerHTML={{
        __html:
          "window.ga=window.ga||function(){(ga.q = ga.q || []).push(arguments)};ga.l=+new Date;ga('create', 'UA-62748172-1','auto');",
      }}
    ></script>
  </div>
);
