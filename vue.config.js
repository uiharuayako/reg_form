module.exports = {
    publicPath: "/reg_form/",
    devServer: {
        proxy: {
            '/api': {
                target: 'https://raw.githubusercontent.com/uiharuayako/reg_form/master/',
                // 允许跨域
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}