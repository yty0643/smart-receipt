import React from 'react';
import styles from './App.module.css';
import Finance from './service/finance';
import ThemeBtn from './components/theme_btn/theme_btn';
import { useSelector } from 'react-redux';
import { RootState } from './app/store';
import SignInBtn from './components/sign_in_btn/sign_in_btn';
function App({ finance }: { finance: Finance }) {
  const theme = useSelector((state: RootState) => (state.theme.isActive));

  return (
    <div className={`${styles.app} ${theme && styles.dark}`}>
      <header className={styles.header}>
        <p className={`${styles.title} ${theme && styles.dark}`}>Smart Receipt</p>
        <ThemeBtn />
      </header>
      <section className={`${styles.signInSec} ${theme && styles.dark}`}>
        <p className={`${styles.sectionTitle}`}>금융결제원 API를 통해 계좌를 등록하고 웹에서 제공되는 서비스를 이용하세요.</p>
        <p className={`${styles.description}`}>클릭시 오픈뱅킹 본인인증 페이지로 이동합니다.</p>
        <SignInBtn finance={finance}/>
      </section>
    </div>
  );
};

export default App;
