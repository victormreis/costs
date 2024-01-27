import React from 'react';
import styles from './Container.module.css'

const Container = ({children, customClass}) => {
  return ( 
    <div className={`${styles.container} ${styles[customClass]}`}>
      {children}
    </div>
   );
}
 
export default Container;