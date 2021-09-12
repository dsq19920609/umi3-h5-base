import React from 'react';
import styles from './index.less';

function Radio({ name, checked, onChange, id }) {

  const handleClick = () => {
    typeof onChange === 'function' ? onChange( name ? {[name]: !checked} : !checked) : null;
  };

  return checked ? (
    <button id={id} className={styles.checked} onClick={handleClick}></button>
  ) : (
    <button id={id} className={styles.noChecked} onClick={handleClick}></button>
  )
}

export default Radio;
