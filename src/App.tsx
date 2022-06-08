import React, { useEffect, useState } from 'react';
import styles from './App.module.css';
import Finance from './service/finance';
import ThemeBtn from './components/theme_btn/theme_btn';
import { useSelector } from 'react-redux';
import { RootState } from './app/store';
import SignInBtn from './components/sign_in_btn/sign_in_btn';
import AccountList from './components/account_list/account_list';

function App({ finance }: { finance: Finance }) {
  const theme = useSelector((state: RootState) => (state.theme.isActive));
  const [access_code, setAccess_code] = useState<string>();
  const [user_seq_no, setUser_seq_no] = useState<string | null>(window.localStorage.getItem('SR_user_seq_no'));
  const [access_token, setAccess_token] = useState<string | null>(window.localStorage.getItem('SR_access_token'));
  const [expire, setExpire] = useState<string | null>(window.localStorage.getItem('SR_expires_in'));
  const [account_list, setAccount_list] = useState<object[] | null>(JSON.parse(window.localStorage.getItem('SR_account_list') || "null"));
  const [fintech_use_num, setFintech_use_num] = useState<string | null>(window.localStorage.getItem('SR_fintech_use_num'));
  const [userData, setUserData] = useState<object>({});

  const finLogic = () => {
    finance
      .generateToken(access_code!)
      .then(res => {
        if ('rsp_code' in res.data) {
          if (res.data.rsp_code != 'A0000') {
            console.log(res);
            throw new Error(res.data.rsp_message);
          }
        }
        const now = new Date();
        const expire = new Date().setDate(now.getDate() + (res.data.expires_in / 60 / 60 / 24));
        setUser_seq_no(res.data.user_seq_no); // 사용자 고유번호
        window.localStorage.setItem('SR_user_seq_no', res.data.user_seq_no);
        setAccess_token(res.data.access_token); // 토큰
        window.localStorage.setItem('SR_access_token', res.data.access_token);
        setExpire(expire.toString()); // 토큰 만료일자
        window.localStorage.setItem('SR_expires_in', expire.toString());
        return {
          user_seq_no: res.data.user_seq_no,
          access_token: res.data.access_token,
        }
      })
      .then(res => finance.userInfoCheck(res.user_seq_no, res.access_token))
      .then(res => {
        if (res.data.rsp_code != 'A0000')
          throw new Error(res.data.rsp_message);
      
        setAccount_list(res.data.res_list);
        window.localStorage.setItem('SR_account_list', JSON.stringify(res.data.res_list));
        setFintech_use_num(res.data.res_list[1].fintech_use_num);
        window.localStorage.setItem('SR_fintech_use_num', res.data.res_list[1].fintech_use_num);
      })
  };
  
  // const transactionDetails = () => {
  //   const random = Math.floor((Math.random() * (999999999 - 0) + 0)).toString().padStart(9, '0');
  //   finance.transactionDetails(access_token!, random, fintech_use_num!)
  //     .then(res => {
  //       if (res.data.rsp_code != 'A0000')
  //         throw new Error(res.data.rsp_message);
  //       setUserData(res.data);
  //     })
  //     .catch(error => console.log(error));
  // };

  useEffect(() => {
    if (!window.location.search) return;
    setAccess_code(window.location.search.split('=')[1].split('&')[0]);
    window.location.search = "";
  }, [window.location.search]);
  
  useEffect(() => {
    if (!access_code) return;
    finLogic();
  }, [access_code]);
  
  return (
    <div className={`${styles.app} ${theme && styles.dark}`}>
      <header className={styles.header}>
        <p className={`${styles.title} ${theme && styles.dark}`}>Smart Receipt</p>
        <ThemeBtn />
      </header>
      <section className={`${styles.signInSec} ${theme && styles.dark}`}>
        <p className={`${styles.sectionTitle}`}>금융결제원 API를 통해 계좌를 등록하고 웹에서 제공되는 서비스를 이용하세요.</p>
        <p className={`${styles.description}`}>클릭시 오픈뱅킹 본인인증 페이지로 이동합니다.</p>
        <SignInBtn finance={finance} />
      </section>
      <section className={`${styles.accountSec} ${theme && styles.dark}`}>
        <p className={`${styles.sectionTitle} ${theme && styles.dark}`}>계좌 선택</p>
        {account_list && <AccountList account_list={account_list} />}
      </section>
    </div>
  );
};

export default App;