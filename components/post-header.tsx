import { DateTime } from './date-time';

import GithubMark from '../icons/github-mark.svg';

interface PostHeaderProps {
  title: string;
  fileName: string;
  date: string;
}

export const PostHeader = ({ title, fileName, date }: PostHeaderProps) => {
  return (
    <>
      <h1 className="text-gray-800 text-2xl md:text-4xl my-4" itemProp="headline">
        {title}
      </h1>
      <div>
        <p className="mb-4">
          Published <DateTime date={date} />
        </p>
        <a
          className="inline-flex items-center py-1 px-3 bg-gray-200 rounded-sm text-gray-800 visited:text-gray-800 hover:bg-gray-400 focus:bg-gray-400"
          href={`https://github.com/Vestride/glen.codes/blob/main/_posts/${fileName}`}
          target="_blank"
        >
          <GithubMark width={16} height={16} className="flex-shrink-0 mr-1" viewBox="0 0 1024 1024" />
          <span>Edit on GitHub</span>
        </a>
      </div>
    </>
  );
};
