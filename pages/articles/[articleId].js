import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import useSWR from 'swr'
import ReactMarkdown from 'react-markdown'
import Header from '../../components/header/header'

import styles from '../../styles/SingleArticle.module.scss'

const Article = ({ article }) => {
  const [suggestionList, setSuggestionList] = useState([])

  const { data, error } = useSWR("allArticles", async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/articles?sort=id:desc&fields=title,type,description,publishedAt&filters[type][$eq]=${article.attributes.type}&pagination[limit]=5&populate[image][fields][0]=url`)
    const data = await response.json()
    const filtered = data.data.filter(item => item.id !== article.id)
    setSuggestionList(filtered)
    return filtered
  })

  if (error) return "An Error has occurred"

  const suggestions = (!data) ? <h2>Loading...</h2> : suggestionList.map((post, index) => (
    <div className={styles.content} key={index}>
      <div className={styles.suggestionTitle}>
        <div className={styles.suggestionImageContainer}>
          <Image className={styles.suggestionImage} src={`${post.attributes.image.data.attributes.url}`} alt="suggestion Image" width={50} height={50} />
        </div>
        <Link href={`/articles/${post.id}`} passHref>
          <h3>{post.attributes.title.slice(0, 30)}</h3>
        </Link>
      </div>
      <p>{post.attributes.description.slice(0, 100)}...</p>
    </div>
  ))

  return (
    <main>
      <Head>
        <meta property="og:title" content={`${article.attributes.title}`}/>
        <meta property="og:image" content={`${article.attributes.image.data.attributes}`}/>
        <meta property="og:description" content="DESCRIPTION OF YOUR SITE"/>
        <meta property="og:url" content="URL OF YOUR WEBSITE"/>
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="627" />
      </Head>

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

        <aside className={styles.extras}>
          <div className={styles.suggestions}>
            <h2>You may also like</h2>
            <div>
              {suggestions}
            </div>
          </div>

          <div className={styles.socials}>
            <h3>Share this Article</h3>

            <div className={styles.links}>
              <a target="_blank" rel="noreferrer" href={"https://twitter.com/share?url=<URL>&text=<TEXT>via=<USERNAME>"}>
                Twitter
              </a>

              <a target="_blank" rel="noreferrer" href={"https://www.facebook.com/sharer/sharer.php?u=<URL>"}>
                Facebook
              </a>

              <a target="_blank" rel="noreferrer" href={"mailto:?subject=<SUBJECT>&body=<BODY>"}>
                Email
              </a>
            </div>
          </div>
        </aside>
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