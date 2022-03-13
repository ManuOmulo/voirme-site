import ReactMarkdown from 'react-markdown'
import Header from "../../components/header/header"

import styles from '../../styles/SingleArticle.module.scss'

const Article = ({ article }) => {
  return (
    <main>
      <Header title={article.attributes.title} item={article.attributes.image.data.attributes.url}/>
      <div className={styles.main}>
        <div className={styles.description}>
          <h3>Summary</h3>
          <p>{article.attributes.description}</p>
        </div>

        <div className={styles.article}>
          <ReactMarkdown>
            {article.attributes.article}
          </ReactMarkdown>
        </div>
      </div>

    </main>
  )
}

export default Article

export async function getStaticPaths() {
  const response = await fetch(`${process.env.SERVER_URL}/articles?fields[0]=id`)
  const data = await response.json()
  const paths = data.data.map(path => {
    return {
      params: {
        articleId: path.id.toString()
      }
    }
  })

  return {
    paths,
    fallback: true
  }
}

export async function getStaticProps(context) {
  const { params } = context
  const response = await fetch(`${process.env.SERVER_URL}/articles/${params.articleId}?populate=image`)
  const data = await response.json()

  if (!data.data.id) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      article: data.data
    }
  }
}