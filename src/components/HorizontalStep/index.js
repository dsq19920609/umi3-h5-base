import React from 'react';
import styles from './index.less';

// curStep: 1, 2, 3
function HorizontalStep({ curStep }) {
  return (
    <div className={styles.verStep}>
      <div className={`${curStep <= 1 ? styles.curStep : ''} ${curStep > 1 ? styles.preStep : ''}`}>1</div>
      <div className={`${curStep === 2 ? styles.curStep : ''} ${curStep > 2 ? styles.preStep : ''}`}>2</div>
      <div className={curStep >= 3 ? styles.curStep : ''}>3</div>
    </div>
  )
}

export default HorizontalStep;