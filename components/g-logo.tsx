import React from 'react';
import Link from 'next/link';
import cn from 'classnames';

import styles from './g-logo.module.css';

export const GLogo: React.FunctionComponent = () => (
  <Link href="/">
    <a className={cn(styles.link, 'py-2 text-light-blue visited:text-light-blue hover:text-odopink')}>
      <svg viewBox="0 0 32 32" width={24} height={24} className="md:w-8 md:h-8 lg:w-12 lg:h-12 xl:w-16 xl:h-16">
        <title>Letter G Polygon</title>
        <desc>A low-poly polygon in the shape of a G</desc>
        <g>
          <path className={styles.polygon} fill="#9cccec" d="M18 2l-16 14 8 2 8-16z" />
          <path className={styles.polygon} fill="#dfeff9" d="M14 30l-4-12h14l-10 12z" />
          <path className={styles.polygon} fill="#99abb6" d="M2 16l12 14-4-12-8-2z" />
          <path className={cn(styles.polygon, 'hidden', 'md:inline')} fill="#a8bbc7" d="M2 16l8 2 3 9-11-11z" />
          <path className={cn(styles.polygon, 'md:hidden')} fill="#4d85a9" d="M18 2l-8 16h6l2-16z" />
          <path
            className={cn(styles.polygon, 'hidden', 'md:inline')}
            fill="#4d85a9"
            d="M16.747 12.024l-6.747 5.976 8-16-1.253 10.024z"
          />
          <path className={cn(styles.polygon, 'hidden', 'md:inline')} fill="#b1d5ed" d="M2 16l8 2 4-8-12 6z" />
          <path className={cn(styles.polygon, 'hidden', 'md:inline')} fill="#5895bb" d="M16 18h-6l3-6 3 6z" />
          <path className={cn(styles.polygon, 'hidden', 'md:inline')} fill="#d5e4f1" d="M14 30l-1-3 6-3-5 6z" />
          <path
            className={cn(styles.polygon, 'hidden', 'md:inline')}
            fill="#517e9a"
            d="M18 2l-.744 6.012-3.256 1.988 4-8z"
          />
          <path className={cn(styles.polygon, 'hidden', 'md:inline')} fill="#c4dbed" d="M10 18l3 9 6-3-9-6z" />
        </g>
      </svg>
      <span className={styles.text}>glen.codes</span>
    </a>
  </Link>
);
