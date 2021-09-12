import React from 'react';
import { Spin } from 'antd';
import { connect } from 'umi';
import styles from './index.less';

function PageLoading({ loading = false, isLoading = false, hasHeader = false }) {

  // 遮罩点击事件
  const preventClick = (e) => {
    e.preventDefault();
  }

  return (isLoading || loading) ? (
    <div className={`${styles.pageLoading} ${hasHeader ? styles.hasHeader : ''}`} onClick={preventClick}>
      <Spin spinning = {loading || isLoading} size='large'/>
    </div>
  ) : null
}

export default connect(({ global }) => ({
  isLoading: global.isLoading
}))(PageLoading);

