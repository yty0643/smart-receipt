import React, { useEffect, useState } from 'react';
import Finance from '../service/finance';

const Test = ({ finance }: { finance: Finance }) => {
    const [auth_code, setAuth_code] = useState<string>();
    const [access_token, setAccess_token] = useState<string>();
    const [user_seq_no, setUser_seq_no] = useState<string>();

    const onClick = () => {
        finance.auth();
    };

    useEffect(() => { 
        window.location.search && setAuth_code(window.location.search.split('=')[1].split('&')[0]);
    }, [window.location]);

    useEffect(() => { 
        if (!auth_code) return;
        finance
            .createToken(auth_code)
            .then(res => {
                console.log(res);
                setAccess_token(res.data.access_token); 
                setUser_seq_no(res.data.user_seq_no);
            })
    }, [auth_code]);

    useEffect(() => {
        if (!access_token || !user_seq_no) return;
        finance
            .userInfoCheck(access_token, user_seq_no)
            .then(res => console.log(res))
            .catch(error => console.log(error));
    },[access_token,user_seq_no])

    const onClick2 = () => {
        finance.test()
    };

    return (
        <div>
            <button onClick={onClick}>Auth</button>
            <button onClick={onClick2}>UIC</button>
        </div>
    );
};

export default Test;