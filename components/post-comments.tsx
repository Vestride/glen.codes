interface PostCommentsProps {
  slug: string;
}

export const PostComments: React.FunctionComponent<PostCommentsProps> = ({ slug }) => (
  <>
    <div className="mt-4" id="disqus_thread"></div>
    <noscript>Enable JavaScript to view the comments</noscript>
    <script
      dangerouslySetInnerHTML={{
        __html: `
      var disqus_config = function () {
        this.page.url = 'https://glen.codes/${slug}';
        this.page.identifier = '${slug}';
      };
    `,
      }}
    ></script>
    <script async src="https://glencodes.disqus.com/embed.js"></script>
  </>
);
