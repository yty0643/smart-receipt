/// <reference types="react-scripts" />
declare namespace NodeJS {
    interface ProcessEnv {
        readonly NODE_ENV: 'development' | 'production' | 'test';
        readonly PUBLIC_URL: string;
        readonly REACT_APP_CLIENT_ID: string;
        readonly REACT_APP_CLIENT_SECRET: string;
        readonly REACT_APP_BANK_TRAN_ID: string;
    }
}