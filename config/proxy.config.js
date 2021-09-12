export default  {
  '/eshopweb': {
    target: 'http://172.16.25.133:8087/',
    changeOrigin: true,
    pathRewrite: { '^/eshopweb': '' },
  },
}