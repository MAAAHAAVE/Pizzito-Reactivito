import React from 'react';
import styles from './NotFoundBlock.module.scss';

const NotFoundBlock = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>😕</span>
        <br />
        Мы не нашли питсы :(
      </h1>
      <p className={styles.description}>Видимо в адресной строке введена невкусная ссылка</p>
    </div>
  );
};

export default NotFoundBlock;
