import React from 'react';

import { Header } from './header';
import { Footer } from './footer';
import { Meta } from './meta';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FunctionComponent<LayoutProps> = ({ children }) => (
  <div className="flex flex-col min-h-screen">
    <Meta />
    <Header />
    <main className="flex-1 m-y-8">{children}</main>
    <Footer />
  </div>
);

export default Layout;
