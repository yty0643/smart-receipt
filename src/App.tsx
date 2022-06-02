import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import styles from './App.module.css';
import Finance from './service/finance';

function App({ finance }: { finance: Finance }) {
  
  const onClick = () => {
    finance.auth();
  }

  return (
    <div className={styles.app}>
      <button onClick={onClick}>auth</button>
    </div>
  );
};

export default App;
