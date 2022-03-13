import Link from 'next/link'
import Image from 'next/image'
import dateFormat from 'dateformat'

import styles from './topStories.module.scss'

const TopStoriesComponent = ({ post, className }) => {
  return (
    <Link href={`/articles/${post.id} `} passHref>
      <div className={className}>
        <div className={styles.picture}>
          <Image src={`${post.attributes.image.data.attributes.url}`}  alt="small" height={100} width={100}/>
        </div>

        <div className={styles.details}>
          <h3>{post.attributes.title}</h3>
          <p>{dateFormat(post.attributes.publishedAt, "dddd, dS mmmm, yyyy")}</p>
        </div>
      </div>
    </Link>
  )
}

export default TopStoriesComponent