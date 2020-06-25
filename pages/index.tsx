import { Container } from '../components/container';
import { Layout } from '../components/layout';
import { getAllPosts } from '../lib/api';
import { IndexPostsList } from '../components/index-posts-list';
import { AboutMe } from '../components/about-me';
import { Intro } from '../components/intro';
import { PostType } from '../types/post';

interface IndexProps {
  allPosts: PostType[];
}

const Index = ({ allPosts }: IndexProps) => {
  return (
    <Layout>
      <Container>
        <div className="grid grid-cols-12">
          <div className="col-span-12 md:col-span-10">
            <Intro />
          </div>
        </div>
        <div className="grid grid-cols-12 row-gap-8 md:col-gap-8 mt-4">
          <div className="col-span-12 md:col-span-4 md:order-2 lg:col-span-3 lg:col-end-13">
            <AboutMe />
          </div>
          <div className="col-span-12 md:col-span-8 md:order-1">
            <IndexPostsList posts={allPosts} />
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default Index;

export const getStaticProps = async () => {
  const allPosts = getAllPosts(['title', 'date', 'slug', 'coverImage', 'excerpt', 'fileName']);

  return {
    props: { allPosts },
  };
};
