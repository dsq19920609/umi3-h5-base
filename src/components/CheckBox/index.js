import React, { useState } from 'react';
import styles from './index.less';

function CheckBox({ name, checked, onChange }) {
  const handleClick = () => {
    typeof onChange === 'function' ? onChange( name ? {[name]: !checked} : !checked) : null;
  };

  return checked ? (
    <span className={styles.checked} onClick={handleClick}></span>
  ) : (
    <span className={styles.noChecked} onClick={handleClick}></span>
  )
}

export default CheckBox;