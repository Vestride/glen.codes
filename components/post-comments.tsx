import { DiscussionEmbed } from 'disqus-react';

interface PostCommentsProps {
  slug: string;
}

export const PostComments: React.FunctionComponent<PostCommentsProps> = ({ slug }) => (
  <div className="mt-4">
    <DiscussionEmbed
      shortname="glencodes"
      config={{
        url: `https://glen.codes/${slug}`,
        identifier: slug,
      }}
    />
  </div>
);
