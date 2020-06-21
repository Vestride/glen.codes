import { GLogo } from './g-logo';
import Container from './container';

export const Header: React.FunctionComponent = () => {
  return (
    <header className="bg-gray-100" role="banner" aria-label="main navigation">
      <Container>
        <nav className="grid md:grid-cols-4 gap-4">
          <GLogo />
        </nav>
      </Container>
    </header>
  );
};
