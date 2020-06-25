import { Header } from './header';
import { Footer } from './footer';
import { Meta } from './meta';

export const Layout: React.FunctionComponent = ({ children }) => (
  <div className="flex flex-col min-h-screen">
    <Meta />
    <Header />
    <main className="flex-1 m-y-8 overflow-hidden">{children}</main>
    <Footer />
  </div>
);
