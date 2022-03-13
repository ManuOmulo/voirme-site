import Link from 'next/link'
import Image from 'next/image'
import dateFormat from 'dateformat'

import styles from './articlePreview.module.scss'

const ArticlePreview = ({ article }) => {
  return (
    <div className={styles.article}>
      <div className={styles.imageContainer}>
        <Image className={styles.image} src={`${article.attributes.image.data.attributes.url}`} width={250} height={200} alt="articleImage" />
      </div>

      <div className={styles.details}>
        <h3>{article.attributes.title}</h3>
        <p>{article.attributes.description}</p>
        <h4>Published: <span>{dateFormat(article.attributes.publishedAt, "dS mmmm, yyyy")}</span></h4>
        <Link href={`/articles/${article.id}`} passHref>
          <button>Read More</button>
        </Link>
      </div>
    </div>
  )
}

export default ArticlePreview