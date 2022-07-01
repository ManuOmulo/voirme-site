import Link from 'next/link'
import Image from 'next/image'

import styles from './latest.module.scss'

const LatestComponent = ({ post, className }) => {
  const header = (post.attributes.title.length >= 22) ?
  `${post.attributes.title.slice(0, 16)}...` :
  `${post.attributes.title}`
  return (
    <div className={className}>
      <div className={styles.imageWrapper}>
        <Image src={`${post.attributes.image.data.attributes.url}`} alt="latestImage" className={styles.image} width={200} height={200} layout="fill"/>
      </div>

      <div className={styles.details}>
        <h3>{header}</h3>
        <p>{post.attributes.description.slice(0, 100)}...</p>
        <Link href={`/articles/${post.id}`} passHref>
          <button>Read More</button>
        </Link>
      </div>
    </div>
  )
}

export default LatestComponent