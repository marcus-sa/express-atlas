# Express Atlas

A simple and easy-to-use routing wrapper for Express built on directory and file pattern recognition

## Getting Started
Quick overview until documentation and last components has been coded

```javascript
import express from 'express'
import AtlasRouter from 'express-atlas'
import path from 'path'

const app = express()

// apply middleware before usage
// app.use(...)

new AtlasRouter({
  controllers: path.join(__dirname, 'controllers'),
  express: app
})

app.listen(port, () => {
  ...
})
```
...
```javascript
export default {
  method: 'get',
  params: ':user',

  action: function (req, res) {
    res.send(`Welcome to ${req.params.user}!`)
  }
}
```

## Want to quickly import models in a route?
**app.js**
```javascript
import express from 'express'
import AtlasRouter from 'express-atlas'
import path from 'path'
import mongoose from 'mongoose'

const app = express()

// apply middleware before usage
// app.use(...)

new AtlasRouter({
  controllers: path.join(__dirname, 'controllers'),
  express: app,
  mongoose: [path.join(__dirname, 'models'), mongoose]
})

app.listen(port, () => {
  ...
})
```

**some-routing-file.js**
```javascript
export default {
  method: 'get',
  params: ':title',
  model: 'News',

  action: function (req, res, next, News) {
    News.findOne({title: req.params.title}, (err, data) => {
      if (err) throw err

      if (data) {
        res.send(`Title: ${data}`)
      } else {
        res.send('Nothing found')
      }
    })
  }
}
```

## TODO
* Add patterns for ignoring specific directories and files
