import React from 'react';
import ContentLoader from 'react-content-loader';

const MyLoader = (props) => (
  <div className="pizza-block__wrapper">
    <ContentLoader
      className="pizza-block"
      speed={1}
      width={280}
      height={466}
      viewBox="0 0 280 466"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}>
      <circle cx="130" cy="120" r="120" />
      <rect x="0" y="265" rx="10" ry="10" width="280" height="27" />
      <rect x="0" y="313" rx="10" ry="10" width="280" height="88" />
      <rect x="0" y="430" rx="13" ry="13" width="100" height="27" />
      <rect x="130" y="421" rx="23" ry="23" width="150" height="45" />
    </ContentLoader>
  </div>
);

export default MyLoader;
