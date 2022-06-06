import React from 'react';
import styles from './App.module.css';
import Finance from './service/finance';
import ThemeBtn from './components/theme_btn/theme_btn';
import LogoBtn from './components/logo_btn/logo_btn';
function App({ finance }: { finance: Finance }) {
  

  return (
    <div className={styles.app}>
      <header>
        <LogoBtn />
        <ThemeBtn />
      </header>
    </div>
  );
};

export default App;
