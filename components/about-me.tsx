export const AboutMe: React.FunctionComponent = () => (
  <aside className="flex md:block md:mb-6 md:-mt-16">
    <div className="mr-4 md:mr-0 md:mb-4 w-1/3 md:w-full">
      <div className="relative overflow-hidden aspect-ratio-1/1">
        <img
          className="absolute bg-cover w-full h-full"
          srcSet="/assets/glen-224w.jpg 224w,
          /assets/glen-286w.jpg 286w,
          /assets/glen-444w.jpg 444w,
          /assets/glen-572w.jpg 572w"
          sizes="(min-width: 1280px) 286px, (min-width: 768px) 222px, calc((100vw-56px)/3)"
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
