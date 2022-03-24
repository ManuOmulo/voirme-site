import Image from 'next/image'
import PropTypes from 'prop-types'
import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'

import styles from './dialog.module.scss'

export default function SimpleDialog(props) {
  const { onClose, selectedValue, open, image } = props

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
      <DialogTitle>{image.attributes.title}</DialogTitle>
      <div className={styles.imageContainer}>
        <Image
          src={`${image.attributes.image.data.attributes.url}`}
          alt="modal Image"
          width={500}
          height={300}
          className={styles.image}
        />
      </div>
      <div className={styles.details}>
        <h3>{image.attributes.artistName}</h3>
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
