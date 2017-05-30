# Express Atlas

[![Greenkeeper badge](https://badges.greenkeeper.io/marcus-sa/express-atlas.svg)](https://greenkeeper.io/)

A simple and easy-to-use routing wrapper for Express built on directory and file pattern recognition

* Works with both ES6 and CommonJS

## Installation
```$ npm install express-atlas```

## Documentation

### Initialization

#### Without Mongoose
```javascript
import express from 'express'
import AtlasRouter from 'express-atlas'

const app = express()

new AtlasRouter({
  controllers: './controllers' // Path to controllers directory
  express: app
})
```

#### With Mongoose
All Mongoose models will automatically be imported

```javascript
import express from 'express'
import AtlasRouter from 'express-atlas'
import mongoose from 'mongoose'

const app = express()

new AtlasRouter({
  controllers: './controllers' // Path to controllers directory
  express: app,
  mongoose: ['./models', mongoose] // arg1 path to models, arg2 mongoose module itself
})
```

### Routes
Recognition is based on:
* Directories
* Filename
* Params
* Method

Incase of having multiple route names where a post and get request is being called, it's separated by the route extension instead of ```method: 'post'```

* ```{root} > controllers > auth > login.js```
Will become:
```www.example.com/auth/login```

* ```{root} > controllers > auth > login-post.js```
Will become the same, but with a **post** request

* ```{root} > controllers > api > index.js```
Will become:
```www.example.com/api```


#### Routes without Mongoose
```javascript
export default {
  method: 'get', // request type

  action: function (req, res) { // action to be called
    ...
  }
}
```


#### Routes with Mongoose
```javascript
export default {
  method: 'get', // request type
  params: ':title', // params
  model: 'News' // Mongoose model name

  action: function (req, res, next, News) { // action to be called
    const {title} = req.params

    News.findOne({title: title}, (err, data) => {
      if (err) throw err

      if (data) {
        res.json(data)
      } else {
        res.send(`Nothing find for: ${title}`)
      }
    })
  }
}
