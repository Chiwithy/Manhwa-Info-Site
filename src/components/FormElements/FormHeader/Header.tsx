import React from 'react'
import styles from './Header.module.css' 


const Header: React.FC<{headerText: string}> = ({headerText}) => {
  return (
    <div className={styles['form-header']}>{headerText}</div>
  )
}

export default Header;