require('colors')
const fs = require('fs')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 3000

app.use('/assets', express.static('dist'))
app.use(bodyParser.json())
app.set('views', path.join(__dirname, './views'))
app.set('view engine', 'pug')

app.use((req, res, next) => {
  console.log(`[server]: ${req.method} ${req.path.cyan} from ${req.ip.cyan}`)
  next()
})

app.route('/').get((req, res) => {
  res.render(`app.pug`, { name: 'app' })
})

app.route('/:page').get((req, res) => {
  res.render('app.pug', { name: req.params.page })
})

app.route('/api/:endpoint')
  .get((req, res) => {
    fs.readFile(`./data/${req.params.endpoint}.json`, 'utf8', (err, text) => {
      if (err) {
        res.json(404, {
          error: {
            message: 'file not found.',
          }
        })
      } else {
        res.json(JSON.parse(text))
        console.log(`[server]: respond ${req.params.endpoint.cyan} to ${req.ip.cyan}`)
      }
    })
  })
  .post((req, res) => {
    fs.readFile(`./data/${req.params.endpoint}.${type}`, 'utf8', (err, text) => {
      // create a new file when the JSON file does not exist.
      if (err) {
        fs.writeFile(`./data/${req.params.endpoint}.${type}`, JSON.stringify(req.body, null, '  '), err => {
          if (err) {
            console.log(err)
            res.json(500, {
              error: {
                message: err.message,
              }
            })
          } else {
            res.json({
              created: true,
            })
            res.status(200).end()
            console.log(`[server]: create ${`${req.params.endpoint}.json`.cyan} by ${req.ip.cyan}`)
          }
        })
      } else {
        const data = JSON.parse(text)
        const json = data instanceof Array ? data.concat(req.body) : req.body
        fs.writeFile(`./data/${req.params.endpoint}.json`, JSON.stringify(json, null, '  '), err => {
          if (err) {
            console.log(err)
            res.json(500, {
              error: {
                message: err.message
              }
            })
          } else {
            res.status(200).end()
            console.log(`[server]: update ${`${req.params.endpoint}.json`.cyan} by ${req.ip.cyan}`)
          }
        })
      }
    })
  })

app.listen(port, () => {
  console.log(`
--------------------------------

    Local server has started
    on ${`http://localhost:${port}`.cyan}

--------------------------------
`)
})
