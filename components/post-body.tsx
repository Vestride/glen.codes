import styles from './markdown-styles.module.css';

interface PostBodyProps {
  content: string;
}

const PostBody = ({ content }: PostBodyProps) => {
  return (
    <div>
      <div className={styles.markdown} dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default PostBody;
