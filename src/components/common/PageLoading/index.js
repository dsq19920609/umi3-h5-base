import React from 'react';
import { ActivityIndicator } from 'antd-mobile';
import { connect } from 'umi';
import styles from './index.less';

function PageLoading({ loading = false, isLoading = false, hasHeader = false }) {

  // 遮罩点击事件
  const preventClick = (e) => {
    e.preventDefault();
  }

  return (isLoading || loading) ? (
    <div className={`${styles.pageLoading} ${hasHeader ? styles.hasHeader : ''}`} onClick={preventClick}>
      <ActivityIndicator animating = {loading || isLoading}/>
    </div>
  ) : null
}

export default connect(({ global }) => ({
  isLoading: global.isLoading
}))(PageLoading);

