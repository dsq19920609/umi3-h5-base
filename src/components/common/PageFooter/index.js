import React from 'react';
import styles from './index.less';

function PageFooter({ handleClick, style, content, footerStyle, id }) {
  return (
    <div className={`${styles.container}`} style={footerStyle}>
      <button id={id} onClick={handleClick} style={style}>{content}</button>
    </div>
  )
}

export default PageFooter;