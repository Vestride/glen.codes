import { Container } from './container';

export const PostComments: React.FunctionComponent = () => (
  <>
    <Container>
      <div id="disqus_thread"></div>
      <noscript>Enable JavaScript to view the comments</noscript>
    </Container>
    <script async src="https://glencodes.disqus.com/embed.js"></script>
  </>
);
