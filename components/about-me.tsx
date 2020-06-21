export const AboutMe: React.FunctionComponent = () => (
  <aside className="flex md:block md:mb-6 md:-mt-16">
    <div className="mr-4 md:mr-0 md:mb-4 w-1/3 md:w-full">
      <div className="relative overflow-hidden aspect-ratio-1/1">
        <img
          className="absolute bg-cover w-full h-full"
          srcSet="/assets/glen-175w.jpg 175w,
          /assets/glen-300w.jpg 300w,
          /assets/glen-400w.jpg 400w,
          /assets/glen-600w.jpg 600w"
          sizes="(min-width: 1290px) 300px, (min-width: 1016px) 22vw, (min-width: 760px) 29vw, 28vw"
          src="/assets/glen-600w.jpg"
          alt="A photo of Glen Cheney smiling while sitting in a restaurant."
        />
      </div>
    </div>
    <div className="flex-1">
      <p className="mb-0">
        Hey, I&rsquo;m <a href="https://glencheney.com">Glen Cheney</a>.
      </p>
      <p className="mb-0 mt-2">
        I&rsquo;m a front-end developer at <a href="http://www.lyft.com">Lyft</a> in San Francisco.
      </p>
      <p className="mb-0 mt-2">
        You can find me on <a href="https://github.com/Vestride">GitHub</a>,{' '}
        <a href="https://twitter.com/Vestride">Twitter</a>, and <a href="http://codepen.io/Vestride/">CodePen</a> as
        Vestride.
      </p>
    </div>
  </aside>
);
