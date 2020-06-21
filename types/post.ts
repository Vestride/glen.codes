type PostType = {
  slug: string;
  title: string;
  date: string;
  coverImage: string;
  codepen: boolean;
  excerpt: string;
  ogImage: {
    url: string;
  };
  content: string;
  fileName: string;
};

export default PostType;
