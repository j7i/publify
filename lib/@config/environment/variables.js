const prod = process.env.NODE_ENV === 'production'

module.exports = {
  'process.env.BASE_URL': prod ? process.env.NOW_URL : 'http://localhost-3ks81ow0:3000'
}
