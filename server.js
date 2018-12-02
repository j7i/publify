const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const next = require('next')
const admin = require('firebase-admin')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const credentials = Buffer.from(process.env.SERVER_CREDENTIALS, 'base64').toString()

const firebase = admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(credentials)),
  databaseURL: 'https://publify-hsr18fe.firebaseio.com'
})

const firestore = admin.firestore()
if (!firestore.settings.timestampsInSnapshots) {
  firestore.settings({ timestampsInSnapshots: true })
}

app
  .prepare()
  .then(() => {
    const server = express()

    server.use(bodyParser.json())
    server.use(
      session({
        secret: 'geheimnis',
        saveUninitialized: true,
        store: new FileStore({ path: '/tmp/sessions', secret: 'geheimnis' }),
        resave: false,
        rolling: true,
        httpOnly: true,
        cookie: { maxAge: 604800000 } // week
      })
    )

    server.use((req, res, next) => {
      req.firebaseServer = firebase
      next()
    })

    server.get('/api/adverts', async (req, res) => {
      let adverts = []

      await firestore
        .collection('seekings')
        .where('published', '==', true)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            adverts.push({ id: doc.id, ...doc.data() })
          })
          res.send(adverts)
        })
        .catch(error => {
          console.error(error)
          res.send({ error })
        })
    })

    server.get('/api/detail/:id', async (req, res) => {
      const id = req.params.id
      await firestore
        .collection('seekings')
        .doc(id)
        .get()
        .then(doc => {
          if (!doc.exists) {
            res.status(404).send({ error: 'No such document!' })
          } else {
            let data
            data = doc.data()
            data.id = doc.id
            res.send(data)
          }
        })
        .catch(error => {
          console.error(error)
          res.send({ error })
        })
    })

    server.get('/detail/:id', (req, res) => {
      const id = req.params.id
      const actualPage = '/detail'
      const queryParams = { id }
      return app.render(req, res, actualPage, queryParams)
    })

    server.get('/seekings/edit/:id', (req, res) => {
      const id = req.params.id
      const actualPage = '/edit'
      const queryParams = { id }
      return app.render(req, res, actualPage, queryParams)
    })

    server.post('/api/login', (req, res) => {
      if (!req.body) return res.sendStatus(400)

      const token = req.body.token
      firebase
        .auth()
        .verifyIdToken(token)
        .then(decodedToken => {
          req.session.decodedToken = decodedToken
          return decodedToken
        })
        .then(decodedToken => res.json({ status: true, decodedToken }))
        .catch(error => res.json({ error }))
    })

    server.post('/api/logout', (req, res) => {
      req.session.decodedToken = null
      res.json({ status: true })
    })

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(port, err => {
      if (err) throw err
      console.log(`🦖  Ready on http://localhost:${port}`)
    })
  })
  .catch(ex => {
    console.error(ex.stack)
    process.exit(1)
  })
