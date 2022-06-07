import axios from 'axios';

export default class Finance{
    
    // 사용자 인증
    authorize() {
        const url =
            `/oauth/2.0/authorize?` +
            `response_type=code&` +
            `client_id=${process.env.REACT_APP_CLIENT_ID}&` +
            `redirect_uri=${process.env.REACT_APP_REDIRECT_URL}&` +
            `scope=login inquiry transfer&client_info=test&` +
            `state=b80BLsfigm9OokPTjy03elbJqRHOfGSY&` + //난수 32비트
            `auth_type=0&` +
            `cellphone_cert_yn=Y&` +
            `authorized_cert_yn=Y&` +
            `account_hold_auth_yn=N&` +
            `register_info=A`;
        window.open(url, "_blank");
    };

    // 토큰 발급
    generateToken(ACCESS_CODE: string) {        
        return axios.post('/oauth/2.0/token',
            new URLSearchParams({
                'code': ACCESS_CODE,
                'client_id': process.env.REACT_APP_CLIENT_ID,
                'client_secret': process.env.REACT_APP_CLIENT_SECRET,
                'redirect_uri': process.env.REACT_APP_REDIRECT_URL,
                'grant_type': 'authorization_code'
            }),
            {
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        )
    };

    // 사용자 정보 조회
    userInfoCheck(USER_SEQ_NO: string, ACCESS_TOKEN: string) {
        return axios.get('/v2.0/user/me', {
            params: {
                'user_seq_no': USER_SEQ_NO
            },
            headers: {
                'Authorization': 'Bearer '+ ACCESS_TOKEN,
            }
        })
    };

    // 거래 내역 조회
    transactionDetails(ACCESS_TOKEN: string, RANDOM_NUM: string, FINTECH_USE_NUM: string) {
        return axios.get('/v2.0/account/transaction_list/fin_num', {
            params: {
                // 은행거래고유번호 = 기관고유번호 + U + 기간부여번호(9자리 난수 중복x)
                // 나중에 조회 일자도 파라미터로 받는거 수정해야함.
                'bank_tran_id': process.env.REACT_APP_BANK_TRAN_ID + RANDOM_NUM,
                'fintech_use_num': FINTECH_USE_NUM,
                'inquiry_type': 'A',
                'inquiry_base': 'D',
                'from_date': '20220503',
                'to_date': '20220603',
                'sort_order': 'D',
                'tran_dtime': '20220603234400',
            },
            headers: {
                'Authorization': 'Bearer ' + ACCESS_TOKEN
            }
        })
    };
};