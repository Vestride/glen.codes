import cn from 'classnames';

import { DateTime } from './date-time';
import Post from '../types/post';

interface IndexPostsListProps {
  posts: Post[];
}

export const IndexPostsList: React.FunctionComponent<IndexPostsListProps> = ({ posts }) => (
  <section>
    {posts.map((post, i) => (
      <article key={post.title} className={cn({ 'mt-8': i > 0 })} itemScope itemType="http://schema.org/BlogPosting">
        <h2 className="text-xl md:text-3xl" itemProp="headline">
          <a href={`/${post.slug}`}>{post.title}</a>
        </h2>
        <p>
          <small>
            Published on <DateTime date={post.date} />
          </small>
        </p>
        <div itemProp="description">{post.excerpt}</div>
      </article>
    ))}
  </section>
);
