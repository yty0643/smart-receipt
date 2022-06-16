const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/smart-receipt/oauth',
        createProxyMiddleware({
            target: 'https://testapi.openbanking.or.kr',
            changeOrigin: true,
        })
    );
    app.use(
        '/smart-receipt/v2.0',
        createProxyMiddleware({
            target: 'https://testapi.openbanking.or.kr',
            changeOrigin: true,
        })
    );
};

// https://openapi.openbanking.or.kr
// https://testapi.openbanking.or.kr