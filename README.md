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

## TODO
* Add patterns for ignoring specific directories and files
