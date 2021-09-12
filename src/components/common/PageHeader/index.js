import React from 'react';
import BackIcon from '@images/common/ic_nav_arrow@2x.png'
import styles from './index.less';

function PageHeader({ onBack, content }) {
  return (
    <div className={styles.pageHeader}>
      <div className={styles.imgBox} onClick={onBack}><img src={BackIcon} alt=''/></div>
      {content}
    </div>
  )
}

export default PageHeader;