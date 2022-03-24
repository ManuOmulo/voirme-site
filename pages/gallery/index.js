import { useState } from 'react'
import Image from 'next/image'

import Header from '../../components/header/header'
import SimpleDialog from '../../components/dialog/dialog'

import styles from '../../styles/Gallery.module.scss'

const Gallery = ({ images }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <main>
      <Header hero="VoirMe Gallery"/>

      <div className={styles.main}>
        <div className={styles.gallery}>
          {
            images.map((image) => (
                <div key={image.id} className={styles.image}>
                  <SimpleDialog
                      open={open}
                      onClose={handleClose}
                      image={image}
                    />
                  <div key={image.id} className={styles.imageContainer}>
                    <Image onClick={handleClickOpen} src={`${image.attributes.image.data.attributes.url}`} layout="fill" alt=" backgroundImage"/>
                  </div>
                </div>
              ))
          }
        </div>
      </div>
    </main>
  )
}

export default Gallery

export async function getServerSideProps() {
  const response = await fetch(`${process.env.SERVER_URL}/paintings?populate[image][fields][0]=url&sort=id:desc`)
  const data = await response.json()

  return {
    props: {
      images: data.data
    }
  }
}