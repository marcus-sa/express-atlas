/*
 * atlas
 * https://github.com/marcus-sa/express-atlas
 *
 * Copyright (c) 2016 Marcus S. Abildskov
 * Licensed under the MIT license.
 */

import glob from 'glob'
import path from 'path'
import fs from 'fs'

export default class AtlasRouter {

  constructor(controllers: String, app: Object, options: Object) {
    glob.sync(path.join(controllers, '**')).forEach(file => {
      try {
        const resolve = path.resolve(file)

        if(fs.lstatSync(resolve).isDirectory()) {
          return false
        }

        const removeDirFromPath = resolve.replace(controllers, '')
        const convertToRoute = removeDirFromPath.split('\\').join('/')
        var route = convertToRoute.replace('.js', '')

        // Ignore dirs
        /*if(this.ignoreDir(removeDirFromPath, options.ignoreDirs)) {
          return false
        }*/

        if(path.basename(file).includes('index')) {
          route = route.replace('/index', '')
        }

        const Controller = require(file)

        if (typeof Controller.params === 'undefined') {
          Controller.params = ''
        }

        // If by default you have a page that takes in both a post and get request, you can simply create 2 different routes
        // and with one of them put the '-{method}' at the end before the file extension like so:
        // > root
        //  > controllers
        //   > auth
        //    > login.js
        //    > login-post.js
        if (typeof Controller.method === 'undefined') {
          const getMethod = route.split('-')[1]
          route = route.replace(`-${getMethod}`, '')
          Controller.method = getMethod
        }

        this.apply(app, route, Controller)
      } catch(err) {
        throw err
      }
    })
  }

  apply(app, route, Controller) {
    const method = new Function('app', 'action', `return app.${Controller.method}('${route}/${Controller.params}', action)`)

    method(app, Controller.action)
  }

  /*ignoreDir(path: String, ignore: Array) {
    if (typeof ignore !== 'undefined') {
      console.log(ignore.split('/'))
      console.log(path.split('/'))
    }
  }*/

}
