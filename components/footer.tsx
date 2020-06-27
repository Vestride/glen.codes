import { Container } from './container';
import Code from '../icons/code.svg';
import Heart from '../icons/heart.svg';

export const Footer: React.FunctionComponent = () => (
  <footer className="mt-4 py-8 text-center bg-blue-900" role="contentinfo">
    <Container>
      <nav>
        <a href="https://glencheney.com" className="group text-white visited:text-white">
          <Code className="inline-block w-4 h-4 fill-current align-middle" aria-label="written" /> with{' '}
          <Heart className="inline-block w-4 h-4 fill-current align-middle" aria-label="love" /> by{' '}
          <span className="group-hover:text-odopink">Glen Cheney</span>
        </a>
      </nav>
    </Container>
  </footer>
);
