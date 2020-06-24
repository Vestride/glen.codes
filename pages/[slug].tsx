import Head from 'next/head';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';

import Container from '../components/container';
import PostBody from '../components/post-body';
import PostHeader from '../components/post-header';
import Layout from '../components/layout';
import { getPostBySlug, getAllPosts } from '../lib/api';
import markdownToHtml from '../lib/markdownToHtml';
import PostType from '../types/post';

interface PostProps {
  post: PostType;
  morePosts: PostType[];
}

const Post = ({ post, morePosts }: PostProps) => {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <Layout>
      <Container>
        {router.isFallback ? (
          <p>Loading…</p>
        ) : (
          <>
            <article itemScope itemType="http://schema.org/BlogPosting">
              <Head>
                <title>{post.title} &ndash; Glen Codes</title>
                <meta property="og:image" content={post.ogImage.url} />
              </Head>
              <PostHeader title={post.title} fileName={post.fileName} date={post.date} />
              <PostBody content={post.content} />
              {post.codepen && <script async src="https://assets.codepen.io/assets/embed/ei.js"></script>}
            </article>
          </>
        )}
      </Container>
    </Layout>
  );
};

export default Post;

interface Params {
  params: {
    slug: string;
  };
}

export async function getStaticProps({ params }: Params) {
  const post = getPostBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'content',
    'ogImage',
    'coverImage',
    'codepen',
    'fileName',
  ]);
  const content = await markdownToHtml(post.content || '');

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(['slug']);

  return {
    paths: posts.map((posts) => ({
      params: {
        slug: posts.slug,
      },
    })),
    fallback: false,
  };
}
