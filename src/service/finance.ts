import axios from 'axios';

export default class Finance{
    auth() {
        const url = "/oauth/2.0/authorize?response_type=code&client_id=43153c76-2bbb-40ac-9560-db57b5979325&redirect_uri=http://localhost:3000&scope=login inquiry transfer&client_info=test&state=b80BLsfigm9OokPTjy03elbJqRHOfGSY&auth_type=0&cellphone_cert_yn=Y&authorized_cert_yn=Y&account_hold_auth_yn=N&register_info=A";
        window.open(url, "_blank");
    };

    createToken(AUTH_CODE: string) {        
        return axios.post('/oauth/2.0/token',
            new URLSearchParams({
                'code': AUTH_CODE,
                'client_id': '43153c76-2bbb-40ac-9560-db57b5979325',
                'client_secret': '2813a5cf-fcb2-4a44-ae29-a3ec66dedc8d',
                'redirect_uri': 'http://localhost:3000',
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

    userInfoCheck(ACCESS_TOKEN: string, USER_SEQ_NO: string) {
        return axios.get(`/v2.0/user/me?user_seq_no=${USER_SEQ_NO}`, {
            headers: {
                'Authorization': `Bearer ${ACCESS_TOKEN}`,
            }
        })
    };

    test() {
        return axios.get('/v2.0/user/me', {
            params: {
                'user_seq_no': '1101007181'
            },
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiIxMTAxMDA3MTgxIiwic2NvcGUiOlsiaW5xdWlyeSIsImxvZ2luIiwidHJhbnNmZXIiXSwiaXNzIjoiaHR0cHM6Ly93d3cub3BlbmJhbmtpbmcub3Iua3IiLCJleHAiOjE2NjIwMDMxODUsImp0aSI6IjFlOGUwOWUzLWIzYTAtNGExNy1iZDU4LWJkZDNkMjEyMzVmOSJ9.2AEIcAEz171aR-Z-X69rt9dzgSkjBZ1UA0O6sfBuzC4'
            }
        })
            .then(res => console.log(res))
            .catch(error => console.log(error));
    };
};