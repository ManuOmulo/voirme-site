import { useState } from 'react'
import Image from 'next/image'
import PropTypes from 'prop-types'
import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'

import styles from './dialog.module.scss'

export default function SimpleDialog(props) {
  const { onClose, selectedValue, open, image } = props
  const [data] = useState(image)

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      BackdropProps={{
        style: {
          backgroundColor: '#000000',
          opacity: 0.09
        }
      }}

    >
      <DialogTitle>{data.attributes.title}</DialogTitle>
      <div className={styles.imageContainer}>
        <Image
          src={`${data.attributes.image.data.attributes.url}`}
          alt="modal Image"
          width={500}
          height={300}
          className={styles.image}
        />
      </div>
      <div className={styles.details}>
        <h3>{data.attributes.artistName}</h3>
      </div>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};
