// 约定式路由时的全局布局文件。
import React  from 'react';
import { LayoutContext } from '@contexts/LayoutContext';
import styles from './index.less';

export default function Layouts({ children }) {

  return (
    <div className={styles.layouts}>
      <LayoutContext.Provider value={{ }}>
        <div className={styles.wrapper}>{children}</div>
      </LayoutContext.Provider>
    </div>
  )
}
