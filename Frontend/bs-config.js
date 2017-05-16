var proxy = require('http-proxy-middleware');

var apiProxy = proxy('/api', {
    target: 'http://localhost:8080/webapp',
    changeOrigin: true,
    pathRewrite: {
        '^/api' : '/'
    }
});

module.exports = {
    server: {
        baseDir: "src",
        routes: {
            "/node_modules": "node_modules"
        },
        middleware: {
            1: apiProxy
        }
    }
};