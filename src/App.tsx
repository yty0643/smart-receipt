import React from 'react';
import Finance from './service/finance';
import { RootState } from './app/store';
import Header from './sections/header/header';
import Signup from './sections/signup/signup';
import Account from './sections/account/account';
import Chart from './sections/chart/chart';
import styles from './App.module.css';
import { useSelector } from 'react-redux';
import Footer from './sections/footer/footer';

function App({ finance }: { finance: Finance }) {
  const theme = useSelector((state: RootState) => (state.theme.isActive));
  
  return (
    <div className={`${styles.app} ${theme && styles.dark}`}>
      <Header />
      <Signup finance={finance}/>
      <Account />
      <Chart />
      <Footer />
    </div>
  );
};

export default App;