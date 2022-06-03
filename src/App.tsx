import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import styles from './App.module.css';
import Finance from './service/finance';
import Test from './components/test';

function App({ finance }: { finance: Finance }) {
  

  return (
    <div className={styles.app}>
      <Test finance={finance} />
    </div>
  );
};

export default App;
