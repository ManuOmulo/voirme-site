import { useState } from 'react'
import Image from 'next/image'

import Navbar from '../../components/navbar/navbar'
import Content from '../../components/content/content'

import styles from '../../styles/Gallery.module.scss'
import hero from '../../public/frank-r-kOvOmb9946Y-unsplash.jpg'

const Gallery = ({ images }) => {
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState([])

  const handleClickOpen = (id) => {
    const fetchData = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/paintings/${id}?populate[image][fields][0]=url`)
      const data = await response.json()
      return data.data
    }
    const imageDetails = fetchData()
    setDetails(imageDetails)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <main>
      <Navbar />

      <div className={styles.hero}>
        <div className={styles.heroImageContainer}>
          <Image src={hero} className={styles.heroImage} alt="hero image" layout="fill"/>
        </div>
        <div className={styles.details}>
          <div className={styles.headerContainer}>
            <div className={styles.header}>
              <h1>Art Gallery</h1>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.main}>
        <div className={styles.gallery}>
          <Content data={images} />
        </div>
      </div>
    </main>
  )
}

export default Gallery

export async function getStaticProps() {
  const response = await fetch(`${process.env.SERVER_URL}/paintings?populate[image][fields][0]=url&sort=id:desc&pagination[start]=0&pagination[limit]=25`)
  const data = await response.json()

  return {
    props: {
      images: data.data
    }
  }
}