import { GLogo } from './g-logo';
import { Container } from './container';

export const Header: React.FunctionComponent = () => {
  return (
    <header className="bg-gray-100 border-t-4 border-light-blue" role="banner" aria-label="main navigation">
      <Container>
        <nav className="grid md:grid-cols-4 gap-4">
          <GLogo />
        </nav>
      </Container>
    </header>
  );
};
