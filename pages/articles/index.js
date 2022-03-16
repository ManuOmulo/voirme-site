import { useState } from 'react';
import ReactPaginate from 'react-paginate'

import Header from '../../components/header/header'
import ArticlePreview from '../../components/article/articlePreview';

import styles from '../../styles/Articles.module.scss'

const limit = 16

const AllArticles = ({ articles, pageCount }) => {
  const [displayedArticles, setDisplayedArticles] = useState(articles)
  const [currentPageCount, setCurrentPageCount] = useState(pageCount)
  const [search, setSearch] = useState(undefined)

  const fetchArticles = async (currentPage, searchTerm=search) => {
    if (searchTerm !== undefined) {
      const response = await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/articles?populate=image&sort=id:desc&pagination[page]=${currentPage}&pagination[pageSize]=${limit}&filters[type][$eq]=${searchTerm}`)
      const data = await response.json()
      return data.data
    } else {
      const response = await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/articles?populate=image&sort=id:desc&pagination[page]=${currentPage}&pagination[pageSize]=${limit}`)
      const data = await response.json()
      return data.data
    }
  }

  const handleClick = async (data) => {
    let displayedPage = data.selected + 1
    // setDisplayedPageNumber(displayedPage)

    if (search !== undefined) {
      const getSearchedArticle = await fetchArticles(displayedPage, search)
      return setDisplayedArticles(getSearchedArticle)
    } else {
      const getNewArticles = await fetchArticles(displayedPage)
      return setDisplayedArticles(getNewArticles)
    }
  }

  const handleChange = async (e) => {
    const { value } = e.target
    const searchTerms = ["sports", "education", "art", "lifestyle"]
    setSearch(value)

    if (value === "all") {
      setCurrentPageCount(pageCount)
      return setDisplayedArticles(articles)
    }

    if (searchTerms.includes(value)) {
      const searchResponse = await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/articles?populate=image&sort=id:desc&pagination[pageSize]=${limit}&filters[type][$eq]=${value}`)
      const data = await searchResponse.json()
      setCurrentPageCount(data.meta.pagination.pageCount)
      return setDisplayedArticles(data.data)
    }
  }

  return (
    <main>
      <header>
        <Header />
      </header>

      <section className={styles.main}>
        <h1>All Articles</h1>

        <div className={styles.articlesContainer}>
          <aside className={styles.categories}>
            <h3>Categories</h3>
            <div onChange={handleChange} className={styles.radio} defaultValue="all">
              <label>
                <input type="radio" name="category" value="all"/>
                <p>All</p>
              </label>

              <label>
                <input type="radio" name="category" value="art"/>
                <p>Art</p>
              </label>

              <label>
                <input type="radio" name="category" value="sports"/>
                <p>Sports</p>
              </label>

              <label>
                <input type="radio" name="category" value="lifestyle"/>
                <p>Lifestyle</p>
              </label>

              <label>
                <input type="radio" name="category" value="education"/>
                <p>Education</p>
              </label>
            </div>
          </aside>

          <div className={styles.articles}>
            {
              displayedArticles.map((article, index) => (
                <ArticlePreview article={article} key={index}/>
              ))
            }
          </div>
        </div>

        <ReactPaginate
          previousLabel="< Prev"
          nextLabel="Next >"
          breakLabel="•••"
          pageCount={currentPageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handleClick}
          containerClassName={styles.paginationContainer}
          pageClassName={styles.pageItem}
          pageLinkClassName={styles.pageLink}
          previousClassName={styles.tags}
          previousLinkClassName={styles.previousLink}
          nextClassName={styles.tags}
          nextLinkClassName={styles.nextLink}
          breakClassName={styles.breakPoints}
          breakLinkClassName={styles.breakPointsClassName}
          activeClassName={styles.active}

        />

      </section>
    </main>
  )
}

export default AllArticles

export async function getServerSideProps() {
  const response = await fetch(`${process.env.SERVER_URL}/articles?populate=image&sort=id:desc&pagination[pageSize]=${limit}`)
  const data = await response.json()

  return {
    props: {
      articles: data.data,
      pageCount: data.meta.pagination.pageCount
    }
  }
}