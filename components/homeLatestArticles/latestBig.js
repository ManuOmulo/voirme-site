import Link from 'next/link'
import Image from 'next/image'

import styles from './latestBig.module.scss'

const LatestBigComponent = ({ post, className }) => {
  return (
    <div className={className}>
      <div className={styles.imageContainer}>
        <Image className={styles.image} src={`${post.attributes.image.data.attributes.url}`} width={400} height={430} alt="bigImage" layout="fill"/>
      </div>

      <div className={styles.details}>
        <h2 className={styles.header}>{post.attributes.title}</h2>
        <Link href={`/articles/${post.id}`} passHref>
          <button className={styles.button}>Read More</button>
        </Link>
      </div>
    </div>
  )
}

export default LatestBigComponent