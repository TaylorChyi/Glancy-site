import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import geoip from 'geoip-lite'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const port = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, 'dist')))

app.set('trust proxy', true)

app.get('/api/locale', (req, res) => {
  const ip =
    (req.headers['x-forwarded-for'] || '').split(',').shift() ||
    req.socket?.remoteAddress ||
    '127.0.0.1'
  const geo = geoip.lookup(ip)
  const country = geo?.country || 'US'
  const map = {
    CN: 'zh',
    US: 'en',
    GB: 'en',
    DE: 'de',
    FR: 'fr',
    RU: 'ru',
    JP: 'ja',
    ES: 'es'
  }
  const lang = map[country] || 'en'
  res.json({ country, lang })
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
