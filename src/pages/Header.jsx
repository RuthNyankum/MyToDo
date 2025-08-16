import React from 'react';
import Styles from '../component/header.module.css';

function Header() {
  return (
    <div className={Styles.header}>
      <h1 className={Styles.title}>Todo App</h1>
    </div>
  );
}

export default Header;
