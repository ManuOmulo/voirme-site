import React, { useState } from "react";
import Image from 'next/image'
import InfiniteScroll from 'react-infinite-scroll-component';

import styles from './content.module.scss'

const Content = ({ data }) => {
  const [posts, setPosts] = useState(data);
  const [hasMore, setHasMore] = useState(true);

  const getMorePost = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/paintings?populate[image][fields][0]=url&sort=id:desc&pagination[start]=${posts.length}&pagination[limit]=25`
    );
    const newPosts = await res.json();
    setPosts((post) => [...post, ...newPosts.data]);
  };

  return (
    <>
      <InfiniteScroll
        dataLength={posts.length}
        next={getMorePost}
        hasMore={true}
        endMessage={<p style={{ textAlign: 'center' }}>
        <b>Yay! You have seen it all</b>
      </p>}
        className={styles.gallery}
      >
        {posts.map((data, key) => (
          <div key={key} className={styles.image}>
            <div className={styles.imageContainer}>
              <Image src={`${data.attributes.image.data.attributes.url}`} layout="fill" alt="backgroundImage"/>
            </div>
            <div className={styles.imageDetails}>
              <p>{data.attributes.title}</p>
            </div>
          </div>
        ))}
      </InfiniteScroll>
    </>
  );
};

export default Content;
