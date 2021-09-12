import React from 'react';
import logoIcon from '@images/common/img_logo_full@2x.png';
import noDataIcon from '@images/common/img_no_data_found@2x.png';
import styles from './index.less';

function WebReminder() {

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div><img className={styles.logo} src={logoIcon} /></div>
        <div><img className={styles.noData} src={noDataIcon} /></div>
        <div className={styles.desc}>
          <span>
            Oops, it seems you’re trying to access this page 
            using your desktop. Please use your mobile handset 
            instead and access the link again.
          </span>
        </div>
      </div>
    </div>
  );
}

export default WebReminder;