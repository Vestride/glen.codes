import styles from './intro.module.css';

export const Intro: React.FunctionComponent = () => (
  <>
    <h1 className={`${styles.title} font-mono text-gray-800 text-3xl md:text-5xl`}>
      <span>glen.codes</span>
    </h1>
    <p className="mt-1">Glen Cheney’s development blog.</p>
  </>
);
