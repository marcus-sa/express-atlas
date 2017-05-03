# Express Atlas

A simple and easy-to-use routing wrapper for Express built on directory and file pattern recognition

## Getting Started
Quick overview until documentation and last components has been coded

If by default you have a page that takes in both a post and get request, you can simply create 2 different routes and with one of them put the '-{method}' at the end before the file extension like so:
* root
  * controllers
    * auth
      * login.js
        * login-post.js

```javascript
import express from 'express'
import AtlasRouter from 'express-atlas'
import path from 'path'

const app = express()

// apply middleware before usage
// app.use(...)

new AtlasRouter(path.join(__dirname, 'controllers'), app)

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

#### Want to quickly assign models to a route?
**app.js**
```javascript
import express from 'express'
import AtlasRouter from 'express-atlas'
import path from 'path'
import mongoose from 'mongoose'

const app = express()

// apply middleware before usage
// app.use(...)

new AtlasRouter(path.join(__dirname, 'controllers'), app, {
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
