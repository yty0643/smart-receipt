import React from 'react';
import styles from './App.module.css';
import Finance from './service/finance';
import ThemeBtn from './components/theme_btn/theme_btn';
import LogoBtn from './components/logo_btn/logo_btn';
import { useSelector } from 'react-redux';
import { RootState } from './app/store';
function App({ finance }: { finance: Finance }) {
  const theme = useSelector((state: RootState) => (state.theme.isActive));

  return (
    <div className={`${styles.app} ${theme && styles.dark}`}>
      <header className={styles.header}>
        <LogoBtn />
        <ThemeBtn />
      </header>
    </div>
  );
};

export default App;
