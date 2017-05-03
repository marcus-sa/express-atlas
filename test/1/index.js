/*
 * atlas
 * https://github.com/marcus-sa/express-atlas
 *
 * Copyright (c) 2016 Marcus S. Abildskov
 * Licensed under the MIT license.
 */


import express from 'express'
import AtlasRouter from '../../src'
import path from 'path'

const app = express()

// apply middleware before usage
// app.use(...)

new AtlasRouter(path.join(__dirname, 'controllers'), app)

const port = 3030

app.listen(port, () => {
  console.log(`Test started on port: ${port}`)
})
